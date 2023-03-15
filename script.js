const textField = document.getElementById("search-result");

const searchString = document.getElementById("search")

document.getElementById("submit-button").onclick = function(e) {
  e.preventDefault();
  textField.textContent = ''

  if (searchString.value.length > 1) {
    fetch(`https://api.github.com/search/repositories?per_page=10&q=${searchString.value}`)
    .then((result) => result.json()
    )
    .then((data)=>{
      if (data.items != 0) {
        data.items.forEach((element) => {
          const resultTemplate = document.querySelector('#card').content
          const resultElement = resultTemplate.querySelector('.card').cloneNode(true);
          resultElement.querySelector('.card__description').textContent = element.name
          resultElement.querySelector('.card__description').href = element.html_url
          resultElement.querySelector('.card__owner').textContent = element.owner.login
          textField.append(resultElement)
        })
      } else {
        textField.style.marginTop = '20px'
        textField.style.textAlign = 'center'
        textField.textContent = 'Ничего не найдено'
      }
  }
  )
    .catch((err) => {
        console.log(err);
      })
  } else {
    textField.style.marginTop = '20px'
    textField.style.textAlign = 'center'
    textField.textContent = 'Слишком короткий запрос'
  }
  searchString.value = ''
}