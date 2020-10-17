import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent, act } from '@testing-library/react'
import SelectSearch from "../Components/SelectSearch"

const clients = [
  {
    "id": 1,
    "name": "Loura",
    "type": "Varejo"
  },
  {
    "id": 2,
    "name": "Vicente",
    "type": "Varejo"
  },
  {
    "id": 3,
    "name": "Zezinho",
    "type": "Varejo"
  },
  {
    "id": 4,
    "name": "Boião",
    "type": "Varejo"
  },
  {
    "id": 5,
    "name": "Ronaldinho",
    "type": "Varejo"
  },
  {
    "id": 6,
    "name": "Manoel Mercado Central",
    "type": "Varejo"
  },
  {
    "id": 7,
    "name": "Janaína",
    "type": "Varejo"
  },
  {
    "id": 8,
    "name": "Braga",
    "type": "Varejo"
  },
  {
    "id": 9,
    "name": "Toninho",
    "type": "Varejo"
  },
  {
    "id": 10,
    "name": "Edmilson",
    "type": "Atacado"
  },
  {
    "id": 11,
    "name": "Inaldo",
    "type": "Varejo"
  }]
let container = null;
beforeEach(() => {
  // Configura um elemento do DOM como alvo do teste
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Limpar ao sair
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const setup = async _ => {
  const fakeSearch = jest.fn().mockImplementation((query) => {
    if (!query) {
      return clients;
    }
    let filterForStart = clients.filter(obj => {
      if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
        return obj.name.toLowerCase().startsWith(query.toLowerCase());
      } else {
        return false;
      }
    });

    let similar = clients.filter(obj => {
      if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
        return obj.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
      } else {
        return false;
      }
    });
    return Promise.resolve([...new Set([...filterForStart, ...similar])]);
  })

  await act(async _ => {
    let aa = render(<SelectSearch onSelect={jest.fn()} placeholder="Escreva o nome do cliente" modelName="Clientes" inputProperty="name" searchFunction={fakeSearch} resetInput={false} />)
    container = aa.container
  });
  const input = container.querySelector('input');
  const button = container.querySelector('[type="button"]');
  const result = container.querySelector('[id="suggestions-select"]');

  return { input, button, result }
}

test("it must show the appropriate placeholder", async () => {
  const { input } = await setup()

  expect(input.placeholder).toBe("Escreva o nome do cliente");
});

test("it should not show a list of results when there is no click on the button", async () => {
  const { result } = await setup()
  expect(result.children.length).toBe(0);
});

test("it should show a list of results when there is click on the button", async () => {
  const { button, result } = await setup()

  expect(result.children.length).toBe(0);
  fireEvent.click(button, { button: 0 })
  expect(result.children.length).toBe(11);
});

test("it must list only one client with the name 'Loura'", async () => {
  const { input, result } = await setup()
  await act(async _ => {
    fireEvent.change(input, { target: { value: "Loura" } })
  })
  expect(result.children.length).toBe(1);
  expect(input.value).toBe("Loura");
})

test("it must list customers that start with the letter 'B'", async () => {
  const { input, result } = await setup()
  await act(async _ => {
    fireEvent.change(input, { target: { value: "B" } })
  })
  expect(input.value).toBe("B");
  expect(result.children.length).toBe(2);
})