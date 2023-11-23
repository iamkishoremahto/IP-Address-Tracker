

var map = L.map('map')

const getIpInfo = async (ip_address = '192.212.174.101') =>{
    const APIKey = 'at_LJRNbaX3nQwN124gwI8sdc11DCVvV'

    // const URL = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${APIKey}=${ip_address}`

    const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${APIKey}&ipAddress=${ip_address}`

    const response = await fetch(URL)
    return await response.json()
}


async function setMap (lat,long){
    await map.setView([lat,long], 13);

    const customIcon = await L.icon({
        iconUrl: "/images/icon-location.svg",
        iconSize:[60,70]
    })

    await L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    await L.marker([lat,long],{
        title:"test",
        icon: customIcon
    }).addTo(map);  
}

const leafMapHandler = async (lat,long) => {

    await setMap(lat,long)

    
}

async function generateMap(){
    
}

const showMap = async (ip_address) =>{
    // const ipInfo = await getIpInfo()
 
    const lat = await ipInfo.location.lat
    const long = await ipInfo.location.lng
   
    const ip = document.querySelector('#ip');
    const location = document.querySelector('#location');
    const timezone = document.querySelector('#timezone');
    const isp = document.querySelector('#isp');

    ip.innerHTML = ipInfo.ip
    location.innerHTML = ipInfo.location.city + ',' + ipInfo.location.region + ',' + ipInfo.location.country + ' ' + ipInfo.location.postalCode
    timezone.innerHTML = ipInfo.location.timezone;
    isp.innerHTML = ipInfo.isp

    // searchBtnHandler(map)
    return  {'lat':lat, 'lon':long}

}

const searchBtnHandler = async () =>{
    
    const searchBtn = document.querySelector('#searchBtn');

    searchBtn.addEventListener('click',async () => {
        const ipInput = document.querySelector('#ip');
        

        if(ipInput.value !== '' && ipInput.value !== ' ' && ipInput.value !== null){
            console.log('iam ')
            console.log(ipInput);
            const latLong = await showMap(ipInput.value);
        const lat = await  latLong.lat;
        const lon = await  latLong.lon;
        console.log(lat, lon);
         await leafMapHandler(lat, lon);
        }
    })
}

const showFirstTimeMap = async () =>{
    const latLong = await showMap();
    console.log(latLong)
    leafMapHandler(latLong.lat,latLong.lon);
}

// showFirstTimeMap()
// searchBtnHandler();


// leafMapHandler(34.04915,-118.09462);

