const goodSearchHandler = () => {
  const goodsSearchForm = document.forms.goodsSearch;

  if (!goodsSearchForm) return;

  const [input] = goodsSearchForm.elements;
  const placeholder = goodsSearchForm.querySelector('.goods-search-form__placeholder');

  input.addEventListener('input', (event) => {
    if (event.target.value && !placeholder.classList.contains('_hidden'))
      placeholder.classList.add('_hidden');
    
    if (!event.target.value && placeholder.classList.contains('_hidden'))
      placeholder.classList.remove('_hidden');
  });
}

export default goodSearchHandler;
