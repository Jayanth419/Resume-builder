document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const preview = document.getElementById('preview-content');
    const addEducationBtn = document.getElementById('add-education');
    const educationSection = document.getElementById('education-section');
    const addExperienceBtn = document.getElementById('add-experience');
    const experienceSection = document.getElementById('experience-section');
    const resetBtn = document.getElementById('reset');
    
    form.addEventListener('input', updatePreview);
    addEducationBtn.addEventListener('click', () => addSection('education', educationSection));
    addExperienceBtn.addEventListener('click', () => addSection('experience', experienceSection));
    resetBtn.addEventListener('click', clearPreview);
    function updatePreview() {
        const formData = new FormData(form);
        preview.innerHTML = `
            <h3>${formData.get('name')}</h3>
            <p>Email: ${formData.get('email')}</p>
            <p>Phone: ${formData.get('phone')}</p>
            <p>${formData.get('profile')}</p>
            <h4>Education</h4>
            ${getSectionHTML(formData, 'school', 'degree', 'years')}
            <h4>Experience</h4>
            ${getSectionHTML(formData, 'company', 'role', 'duration')}
            <h4>Skills</h4>
            <p>${formData.get('skills')}</p>
        `;
        preview.style.opacity = 1;
    }
    function getSectionHTML(formData, field1, field2, field3) {
        let sectionHTML = '';
        const values1 = formData.getAll(field1 + '[]');
        const values2 = formData.getAll(field2 + '[]');
        const values3 = formData.getAll(field3 + '[]');
        
        for (let i = 0; i < values1.length; i++) {
            sectionHTML += `<p>${values1[i]}: ${values2[i]}, ${values3[i]}</p>`;
        }
        return sectionHTML;
    }
    function addSection(type, section) {
        const entry = document.createElement('div');
        entry.classList.add(`${type}-entry`);
        entry.innerHTML = `
            <label for="${type}">School:</label>
            <input type="text" name="${type}[]">
            
            <label for="degree">Degree:</label>
            <input type="text" name="degree[]">
            
            <label for="years">Years:</label>
            <input type="text" name="years[]">
        `;
        section.appendChild(entry);
    }
    function clearPreview() {
        preview.innerHTML = '';
        preview.style.opacity = 0;
    }
});