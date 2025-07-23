function createUptimeBars(containerId, totalDays, downtimeIndices = []) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < totalDays; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('uptime-day');
        if (downtimeIndices.includes(i)) {
            dayDiv.classList.add('down');
        }
        container.appendChild(dayDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const totalDays = 90;

    const apiDowntimeDays = [20, 45];
    createUptimeBars('api-uptime', totalDays, apiDowntimeDays);

    createUptimeBars('media-proxy-uptime', totalDays);
    createUptimeBars('gateway-uptime', totalDays);
    createUptimeBars('push-notifications-uptime', totalDays);

    createUptimeBars('search-uptime', totalDays);
    createUptimeBars('voice-uptime', totalDays);
    createUptimeBars('client-uptime', totalDays);
    createUptimeBars('third-party-uptime', totalDays);
    createUptimeBars('server-web-pages-uptime', totalDays);
    createUptimeBars('payment-uptime', totalDays);
    createUptimeBars('marketing-site-uptime', totalDays);
});
