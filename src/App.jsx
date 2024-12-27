import { useState } from "react";

function App() {
  const [data, setData] = useState([]); // Stockage local des données
  const [form, setForm] = useState({ id: "", name: "" }); // Formulaire
  const [isEditing, setIsEditing] = useState(false); // Mode édition

  // Gestion du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Ajouter un nouvel élément
  const handleAdd = () => {
    if (form.name) {
      setData([...data, { id: Date.now(), name: form.name }]);
      setForm({ id: "", name: "" });
    }
  };

  // Supprimer un élément
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  // Activer le mode édition
  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  // Mettre à jour un élément
  const handleUpdate = () => {
    setData(
      data.map((item) =>
        item.id === form.id ? { ...item, name: form.name } : item
      )
    );
    setForm({ id: "", name: "" });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD avec ReactJS (sans backend)</h1>

      {/* Formulaire */}
      <div>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Entrez un nom"
        />
        {!isEditing ? (
          <button onClick={handleAdd}>Ajouter</button>
        ) : (
          <button onClick={handleUpdate}>Mettre à jour</button>
        )}
      </div>

      {/* Liste des données */}
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleEdit(item)}>Modifier</button>
            <button onClick={() => handleDelete(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
