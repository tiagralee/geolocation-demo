(function() {
    const autocompleteUrlPrefix = 'http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=ByGpw3zfma3YcmKCztWi&app_code=NZVdIXcW4j9FcRon3lHMIg&beginHighlight=<b>&endHighlight=</b>&country=AUS&maxresults=5&query=';
    document.getElementById('autocomplete-input').addEventListener('keyup', (ele) => {
        //get input value
        console.log('input')
        let inputValue = ele.target.value;
        //call map api to search
        debounce(remoteCall, 1000)(inputValue);
    })

    function renderDropdown(suggestions) {
        document.getElementById('dropdown-menu').innerHTML = ''
        suggestions.forEach(element => {
            document.getElementById('dropdown-menu')
                .insertAdjacentHTML('beforeend', 
                `<a href="#" class="dropdown-item">
                ${element.label}
              </a>`
                )
        });
    }

    async function remoteCall(input) {
        
        const response = await fetch(autocompleteUrlPrefix + input)
        const result =  await response.json();

        renderDropdown(result.suggestions);
    }

    var inThrottle = false;
    const throttle = (func, limit) => {
        
        return function() {
          const args = arguments
          const context = this
          if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
          }
        }
      }

      var inDebounce = false;
      const debounce = (func, delay) => {
        
        return function() {
          const context = this
          const args = arguments
          clearTimeout(inDebounce)
          inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
      }

})();