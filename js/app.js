
let local = localStorage.getItem("Cidade:")
document.querySelectorAll('input')[0].focus()
document.querySelectorAll('input')[0].value = local
document.querySelectorAll('button')[0].addEventListener('click', getApi)

async function getApi() {
    let input = document.querySelectorAll('input')[0].value
    if (input == '') {
        return
    } else {
        try {
            const API = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&lang=pt_br&units=metric&appid=ae0ae32b87e11c4858254e195e863338`)
            console.log(API);
            if (API.ok) {
                const DATA = await API.json()
                console.log(DATA);
                let date = new Date()
                let hour = date.getHours()
                let min = date.getMinutes()
                let day = date.getDate()
                let month = monthOfYear(date.getMonth())
                let daySem = dayOfWeek(date.getDay())
                let city = DATA.name
                let country = DATA.sys.country
                let turn = dayShift(hour)
                let weather = DATA.weather[0].description
                let icon = weatherIcon(weather)
                let temp = DATA.main.temp

                document.querySelectorAll('h1')[0].textContent = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`
                document.querySelectorAll('p')[0].textContent = `${daySem}, ${day} de ${month}`
                document.querySelectorAll('p')[1].textContent = `${city} - ${country}`
                document.querySelectorAll('h2')[0].textContent = `${turn}`
                document.querySelectorAll('p')[2].textContent = `${weather}`
                document.querySelectorAll('i')[0].outerHTML = `${icon}`
                document.querySelectorAll('h3')[0].textContent = `${parseInt(temp)}°`

                localStorage.setItem("Cidade:", input)
                input = ''
                setTimeout(changeHours, 10000)
            }
        } catch (error) {
            console.log({ message: "Ocorreu algum erro ao solitar os dados: ", error });
        }
    }

}

function dayOfWeek(e) {
    const days = {
        "0": "Domingo",
        "1": "Segunda",
        "2": "Terça",
        "3": "Quarta",
        "4": "Quinta",
        "5": "Sexta",
        "6": "Sábado",
    }
    return days[e]
}

function monthOfYear(e) {
    const months = {
        "0": "janeiro",
        "1": "fevereiro",
        "2": "março",
        "3": "abril",
        "4": "maio",
        "5": "junho",
        "6": "julho",
        "7": "agosto",
        "8": "setembro",
        "9": "outubro",
        "10": "novembro",
        "11": "dezembro",
    }
    return months[e]
}

function dayShift(e) {
    if (e < 12) {
        return "Bom Dia"
    } else if (e < 18) {
        return "Boa Tarde"
    } else {
        return "Boa Noite"
    }
}

function weatherIcon(e) {
    const chooseIcon = {
        "algumas nuvens": '<i class="fa-solid fa-cloud-moon"></i>',
        "céu limpo": '<i class="fa-solid fa-moon"></i>',
        "nublado": '<i class="fa-solid fa-cloud"></i>',
        "chuva moderada": '<i class="fa-solid fa-cloud-rain"></i>',
        "chuva forte": '<i class="fa-solid fa-cloud-showers-heavy"></i>',
    }
    return chooseIcon[e]

}

function changeHours() {
    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()
    document.querySelectorAll('h1')[0].textContent = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`
    console.log("oi");
    setTimeout(changeHours, 10000)
}


getApi()