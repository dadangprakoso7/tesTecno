import { suppliers } from './data/suppliers.js';

const map = L.map('map-container').setView([-7.2575, 112.7521], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const commoditySelect = document.getElementById('commodity');

const addMarkers = (filter = 'all') => {
    suppliers.forEach((supplier) => {
        if (filter === 'all' || supplier.komoditas === filter) {
            const marker = L.marker([supplier.koordinat.lat, supplier.koordinat.lng]).addTo(map);

            marker.bindPopup(`
                <strong>${supplier.nama_supplier}</strong><br>
                ${supplier.alamat}<br>
                <a href="https://wa.me/${supplier.kontak.whatsapp}" target="_blank">WhatsApp</a> |
                <a href="${supplier.kontak.instagram}" target="_blank">Instagram</a> |
                <a href="${supplier.kontak.tokopedia}" target="_blank">Tokopedia</a>
            `);
        }
    });
};

addMarkers();

commoditySelect.addEventListener('change', () => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    const selectedCommodity = commoditySelect.value;
    addMarkers(selectedCommodity);
});
