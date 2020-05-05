const weather = document.querySelector('form')
const search = document.querySelector('input')

const c2 = document.querySelector('#c2')
const c3 = document.querySelector('#c3')

const t1 = document.querySelector('#place')
const t2 = document.querySelector('#temp')
const t3 = document.querySelector('#summary')

const all =document.querySelectorAll('.x')

const im =document.getElementById('logo')

weather.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
  
    fetch('/weather?location='+location).then((response)=>{   
    response.json().then((data)=>{
        if(data.error)
            alert(data.error)
        else
        {
            t1.textContent=data.loc
            t2.textContent=data.temp+"°C"
            t3.textContent=data.summary

            all.forEach(i => i.style.display = "block"  );

            c2.textContent=data.humidity+"%"
            c3.textContent=data.windSpeed+"km/hr"

            im.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`

        }    
       
    })
})

})