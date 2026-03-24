import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AuthorFilters from "@/components/authorFilter";

const mockAuthors = [
  { id: 1, name: "Author A", birthYear: 1980 },
  { id: 2, name: "Author B", birthYear: 1975 },
];

function TestComponent() {
  const [orderedAuthors, setOrderedAuthors] = React.useState(mockAuthors);

  return (
    <div>
      <AuthorFilters
        authors={orderedAuthors}
        onOrderChange={setOrderedAuthors}
      />
      <ul>
        {orderedAuthors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
}

describe("AuthorFilter - Cambio de Orden", () => {
  it("debería cambiar el orden de los autores al seleccionar 'Nombre Z-A'", async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const select = screen.getByRole("combobox", { name: /ordenar por/i });

    await user.selectOptions(select, "name-desc");

    const authors = screen.getAllByRole("listitem");

    expect(authors[0]).toHaveTextContent("Author B");
    expect(authors[1]).toHaveTextContent("Author A");
  });
});