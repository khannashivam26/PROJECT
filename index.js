function createUptimeBars(containerId, totalDays, downtimeIndices = []) {
    const container = document.getElementById(containerId);
    const today = new Date();
    const tooltip = document.getElementById('tooltip');
    const tooltipDate = tooltip.querySelector('.tooltip-date');
    const tooltipStatus = tooltip.querySelector('.tooltip-status');
    
    for (let i = 0; i < totalDays; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('uptime-day');
        
        const date = new Date();
        date.setDate(today.getDate() - (totalDays - 1 - i));
        
        dayDiv.dataset.date = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        if (downtimeIndices.includes(i)) {
            dayDiv.classList.add('down');
            dayDiv.dataset.status = 'Partial outage 1 hrs 33 mins';
        } else {
            dayDiv.dataset.status = 'No downtime recorded on this day.';
        }
        
        dayDiv.addEventListener('mouseover', function(e) {
            tooltipDate.textContent = this.dataset.date;
            tooltipStatus.textContent = this.dataset.status;
            tooltip.style.display = 'block';
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY - 50}px`;
        });
        
        dayDiv.addEventListener('mouseout', function() {
            tooltip.style.display = 'none';
        });

        container.appendChild(dayDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribePopup = document.getElementById('subscribePopup');
    const closeBtn = document.querySelector('.close-btn');
    const subscribeEmailBtn = document.querySelector('.subscribe-email-btn');
    const popupContent = document.querySelector('.popup-content');
    
    subscribeBtn.addEventListener('click', function() {
        subscribePopup.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        subscribePopup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === subscribePopup) {
            subscribePopup.style.display = 'none';
        }
    });

    subscribeEmailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const emailInput = document.querySelector('.popup-form input');
        const email = emailInput.value;

        if (email) {
            popupContent.innerHTML = `
                <span class="close-btn">&times;</span>
                <div style="text-align: center; padding: 20px;">
                    <p style="font-weight: bold; font-size: 16px;">Subscription Confirmed</p>
                    <p>You will receive notifications for all future status updates at your registered email address.</p>
                </div>
            `;
            const newCloseBtn = popupContent.querySelector('.close-btn');
            newCloseBtn.addEventListener('click', function() {
                subscribePopup.style.display = 'none';
            });
        }
    });

    const totalDays = 90;
    const apiDowntimeDays = [87, 88];
    const mediaProxyDowntimeDays = [80];
    const gatewayDowntimeDays = [75];
    const pushNotificationsDowntimeDays = [70];

    createUptimeBars('api-uptime', totalDays, apiDowntimeDays);
    createUptimeBars('media-proxy-uptime', totalDays, mediaProxyDowntimeDays);
    createUptimeBars('gateway-uptime', totalDays, gatewayDowntimeDays);
    createUptimeBars('push-notifications-uptime', totalDays, pushNotificationsDowntimeDays);

    createUptimeBars('search-uptime', totalDays);
    createUptimeBars('voice-uptime', totalDays);
    createUptimeBars('client-uptime', totalDays);
    createUptimeBars('third-party-uptime', totalDays);
    createUptimeBars('server-web-pages-uptime', totalDays);
    createUptimeBars('payment-uptime', totalDays);
    createUptimeBars('marketing-site-uptime', totalDays);
});
