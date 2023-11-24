

var map = L.map('map')

var myIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize:[45, 55],
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 50,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker;


const getIpInfo = async (ip_address = '192.212.174.101') => {
    const APIKey = 'at_LJRNbaX3nQwN124gwI8sdc11DCVvV'



    const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${APIKey}&ipAddress=${ip_address}`

    const response = await fetch(URL)
    return await response.json()
}




const leafMapHandler = async (pos) => {
    const lat = pos.lat;
    const lng = pos.lng;
    map.setView([lat, lng], 50)

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lng], {icon: myIcon}).addTo(map);
    // map.fitBounds(marker.getBounds());
    map.setView([lat, lng], 13)

}



const showMap = async (ip_address) => {
    const ipInfo = await getIpInfo(ip_address)
    console.log(ipInfo)

    const lat = await ipInfo.location.lat
    const lng = await ipInfo.location.lng
    
    const ip = document.querySelector('#ip');
    const location = document.querySelector('#location');
    const timezone = document.querySelector('#timezone');
    const isp = document.querySelector('#isp');

    ip.innerHTML = ipInfo.ip
    location.innerHTML = ipInfo.location.city + ',' + ipInfo.location.region + ',' + ipInfo.location.country + ' ' + ipInfo.location.postalCode
    timezone.innerHTML = ipInfo.location.timezone;
    isp.innerHTML = ipInfo.isp
    leafMapHandler({ 'lat': lat, 'lng': lng })
    // searchBtnHandler(map)
    

}

const searchBtnHandler = async () => {

    const searchBtn = document.querySelector('#searchBtn');

    searchBtn.addEventListener('click', async () => {
        const ipInput = document.querySelector('#ipInput');


        if (ipInput.value !== '' && ipInput.value !== ' ' && ipInput.value !== null) {
            console.log('iam ')
            console.log(ipInput);
            await showMap(ipInput.value);
            
        }
    })
}

// const showFirstTimeMap = async () =>{
//     const latLong = await showMap();
//     console.log(latLong)
//     leafMapHandler(latLong.lat,latLong.lon);
// }

// showFirstTimeMap()
// searchBtnHandler();


// leafMapHandler(34.04915,-118.09462);

showMap()
searchBtnHandler()

