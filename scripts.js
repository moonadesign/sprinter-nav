async function loadSprints() {
    const response = await fetch('sprints.json');
    const sprints = await response.json();
    const container = document.getElementById('sprints');

    let currentMonth = '';
    
    sprints.forEach((sprint, i) => {
        const month = new Date(sprint.startDate).toLocaleString('default', { month: 'long' });
        if (month !== currentMonth) {
            currentMonth = month;
            const monthDiv = document.createElement('div');
            monthDiv.className = 'month';
            monthDiv.textContent = month;
            container.appendChild(monthDiv);
        }

        const div = document.createElement('div');
        div.className = 'sprint';
        
        // Generate array of dates between start and end
        const days = [];
        let currentDate = new Date(sprint.startDate);
        const endDate = new Date(sprint.endDate);
        while (currentDate <= endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        div.innerHTML = `
            <div class="days">
                ${days.map(date => `
                    <div class="day">${date.getDate()}</div>
                `).join('')}
            </div>
            <div class="workdays">${sprint.workDays}d</div>
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', loadSprints);
