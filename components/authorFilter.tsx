//dropbox ordenado por nombre a-z, z-a, edad más joven y edad más vieja
import React from "react";

type Author = {
  id?: string | number;
  name: string;
  birthDate?: string; 
  birthYear?: number;
  age?: number;
  category?: string;
  image?: string;
  description?: string;
};

type AuthorFiltersProps = {
  authors: Author[];
  onOrderChange: (orderedAuthors: Author[]) => void;
};

const getAge = (author: Author) => {
  if (typeof author.age === "number") return author.age;
  const now = new Date();

  if (author.birthYear) {
    return now.getFullYear() - author.birthYear;
  }

  if (author.birthDate) {
    const birth = new Date(author.birthDate);
    if (!isNaN(birth.getTime())) {
      let age = now.getFullYear() - birth.getFullYear();
      const monthDiff = now.getMonth() - birth.getMonth();
      const dayDiff = now.getDate() - birth.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age -= 1;
      }
      return age;
    }
  }

  return Number.MAX_SAFE_INTEGER;
};

export default function AuthorFilters({ authors, onOrderChange }: AuthorFiltersProps) {
  const [selectedOrder, setSelectedOrder] = React.useState("");

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSelectedOrder(order);

    const sortedAuthors = [...authors];

    if (order === "name-asc") {
      sortedAuthors.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "name-desc") {
      sortedAuthors.sort((a, b) => b.name.localeCompare(a.name));
    } else if (order === "age-asc") {
      sortedAuthors.sort((a, b) => getAge(a) - getAge(b));
    } else if (order === "age-desc") {
      sortedAuthors.sort((a, b) => getAge(b) - getAge(a));
    }

    onOrderChange(sortedAuthors);
  };

  return (
    <div>
      <label htmlFor="order">Ordenar por:</label>
      <select id="order" value={selectedOrder} onChange={handleOrderChange}>
        <option value="">Seleccionar</option>
        <option value="name-asc">Nombre A-Z</option>
        <option value="name-desc">Nombre Z-A</option>
        <option value="age-asc">Edad más joven</option>
        <option value="age-desc">Edad más vieja</option>
      </select>
    </div>
  );
}