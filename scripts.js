async function loadSprints() {
    const response = await fetch('sprints.json');
    const sprints = await response.json();
    const container = document.getElementById('sprints');
    
    let currentMonth = '';
    
    sprints.forEach((sprint, i) => {
        const month = sprint.days?.length ? new Date(sprint.days[0]).toLocaleString('default', { month: 'long' }) : '';
        if (month && month !== currentMonth) {
            currentMonth = month;
            const monthDiv = document.createElement('div');
            monthDiv.className = 'month';
            monthDiv.textContent = month;
            container.appendChild(monthDiv);
        }

        const div = document.createElement('div');
        div.className = 'sprint';
        
        div.innerHTML = `
            <div class="sprint-info">
                <div>Sprint ${i + 1}</div>
                <div>${sprint.emoji} ${sprint.nickname}</div>
                <div class="workdays">${sprint.days?.length || 0}d</div>
            </div>
            <div class="days">
                ${sprint.days?.map(date => {
                    const day = new Date(date + 'T00:00:00');
                    console.log('Date string:', date, 'Parsed date:', day, 'Day of month:', day.getDate());
                    return `<div class="day">${day.getDate()}</div>`;
                }).join('') || ''}
            </div>
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', loadSprints);
