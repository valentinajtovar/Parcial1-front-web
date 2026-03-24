import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthorFilters from "@/components/authorFilter";

const mockAuthors = [
  { id: 1, name: "Alpha", birthYear: 1970 },
  { id: 2, name: "Zeta", birthYear: 2000 },
  { id: 3, name: "Mora", birthYear: 1990 },
];

function Wrapper() {
  const [authors, setAuthors] = React.useState(mockAuthors);

  return (
    <>
      <AuthorFilters authors={authors} onOrderChange={setAuthors} />
      <ul>
        {authors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </>
  );
}

test("ordena por más joven primero con lógica de fechas", async () => {
  const user = userEvent.setup();
  render(<Wrapper />);

  await user.selectOptions(
    screen.getByRole("combobox", { name: /ordenar por/i }),
    "age-asc"
  );

  await waitFor(() => {
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Zeta");
    expect(items[1]).toHaveTextContent("Mora");
    expect(items[2]).toHaveTextContent("Alpha");
  });
});