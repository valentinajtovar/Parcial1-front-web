import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthorFilters from "@/components/authorFilter";

const mockAuthors = [
  { id: 1, name: "Author B", birthYear: 1980 },
  { id: 2, name: "Author A", birthYear: 1975 },
];

describe("AuthorFilters", () => {
  it("debería renderizar el select asociado a su label", () => {
    const mockOnOrderChange = jest.fn();

    render(
      <AuthorFilters
        authors={mockAuthors}
        onOrderChange={mockOnOrderChange}
      />
    );

    expect(screen.getByLabelText("Ordenar por:")).toBeInTheDocument();
  });

  it("debería tener la opción 'Seleccionar' como estado inicial", () => {
    const mockOnOrderChange = jest.fn();

    render(
      <AuthorFilters
        authors={mockAuthors}
        onOrderChange={mockOnOrderChange}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("");
    expect(screen.getByRole("option", { name: "Seleccionar" }).selected).toBe(true);
  });

  it("debería mostrar todas las opciones de ordenamiento", () => {
    const mockOnOrderChange = jest.fn();

    render(
      <AuthorFilters
        authors={mockAuthors}
        onOrderChange={mockOnOrderChange}
      />
    );

    expect(screen.getByRole("option", { name: "Seleccionar" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Nombre A-Z" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Nombre Z-A" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Edad más joven" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Edad más vieja" })).toBeInTheDocument();
  });

  it("debería ordenar por nombre A-Z", () => {
    const mockOnOrderChange = jest.fn();

    render(
      <AuthorFilters
        authors={mockAuthors}
        onOrderChange={mockOnOrderChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "name-asc" } });

    expect(select).toHaveValue("name-asc");
    expect(mockOnOrderChange).toHaveBeenCalledWith([
      { id: 2, name: "Author A", birthYear: 1975 },
      { id: 1, name: "Author B", birthYear: 1980 },
    ]);
  });

  it("debería ordenar por nombre Z-A", () => {
    const mockOnOrderChange = jest.fn();

    render(
      <AuthorFilters
        authors={mockAuthors}
        onOrderChange={mockOnOrderChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "name-desc" } });

    expect(select).toHaveValue("name-desc");
    expect(mockOnOrderChange).toHaveBeenCalledWith([
      { id: 1, name: "Author B", birthYear: 1980 },
      { id: 2, name: "Author A", birthYear: 1975 },
    ]);
  });

  it("debería ordenar por edad más joven", () => {
    const mockOnOrderChange = jest.fn();

    render(
      <AuthorFilters
        authors={mockAuthors}
        onOrderChange={mockOnOrderChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "age-asc" } });

    expect(select).toHaveValue("age-asc");
    expect(mockOnOrderChange).toHaveBeenCalled();
  });

  it("debería ordenar por edad más vieja", () => {
    const mockOnOrderChange = jest.fn();

    render(
      <AuthorFilters
        authors={mockAuthors}
        onOrderChange={mockOnOrderChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "age-desc" } });

    expect(select).toHaveValue("age-desc");
    expect(mockOnOrderChange).toHaveBeenCalled();
  });
});