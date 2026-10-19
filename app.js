// Naètení receptù z pamìti prohlížeèe (nebo výchozí ukázka)
let recipes = JSON.parse(localStorage.getItem('recipes')) || [
    {
        title: "Svíèková na smetanì",
        ingredients: "Hovìzí zadní\nSmetana ke šlehání\nKoøenová zelenina",
        instructions: "Uvaøíme zeleninu, rozmixujeme, pøidáme smetanu..."
    }
];

const recipeList = document.getElementById('recipe-list');
const recipeForm = document.getElementById('recipe-form');
const modal = document.getElementById('modal');

function renderRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredience:</strong><br>${recipe.ingredients.replace(/\n/g, '<br>')}</p>
            <p><strong>Postup:</strong><br>${recipe.instructions}</p>
        `;
        recipeList.appendChild(card);
    });
}

// Uložení nového receptu
recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRecipe = {
        title: document.getElementById('title').value,
        ingredients: document.getElementById('ingredients').value,
        instructions: document.getElementById('instructions').value
    };
    
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderRecipes();
    modal.classList.add('hidden');
    recipeForm.reset();
});

// Ovládání okna
document.getElementById('open-modal-btn').onclick = () => modal.classList.remove('hidden');
document.getElementById('close-modal-btn').onclick = () => modal.classList.add('hidden');

// První vykreslení
renderRecipes();