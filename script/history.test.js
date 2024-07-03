import { expect } from 'chai';
import { JSDOM } from 'jsdom';

// Mock the DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar"></div></body></html>');
global.document = dom.window.document;

// Import the function to be tested
import { criarCalendario } from './history';

describe('criarCalendario', () => {
  beforeEach(() => {
    // Clear the calendar element before each test
    const calendarElement = document.getElementById('calendar');
    calendarElement.innerHTML = '';
  });

  it('should create a calendar table with correct number of days', () => {
    // Set the current date to January 1, 2022
    const dataAtual = new Date(2022, 0, 1);

    // Call the function to create the calendar
    criarCalendario(dataAtual);

    // Get the table element
    const table = document.querySelector('table');

    // Expect the table to exist
    expect(table).to.exist;

    // Expect the table to have 6 rows (5 weeks + header row)
    expect(table.rows.length).to.equal(6);

    // Expect the first row to have 7 cells (days of the week)
    expect(table.rows[0].cells.length).to.equal(7);

    // Expect the total number of cells to be equal to the number of days in the month
    const totalDays = new Date(2022, 1, 0).getDate();
    const totalCells = table.querySelectorAll('td').length;
    expect(totalCells).to.equal(totalDays);
  });

  it('should highlight cells with data', () => {
    // Set up some sample data
    const dadosPorDia = {
      '2022-01-01': { renda: 100, despesa: 50 },
      '2022-01-05': { renda: 200, despesa: 150 },
      '2022-01-10': { renda: 300, despesa: 250 },
    };

    // Set the current date to January 1, 2022
    const dataAtual = new Date(2022, 0, 1);

    // Call the function to create the calendar
    criarCalendario(dataAtual, dadosPorDia);

    // Get the cells with data
    const cellsWithData = document.querySelectorAll('.com-dados');

    // Expect the correct number of cells to have the "com-dados" class
    expect(cellsWithData.length).to.equal(Object.keys(dadosPorDia).length);

    // Expect the cells with data to have the correct text content
    cellsWithData.forEach((cell) => {
      const dataFormatada = cell.textContent;
      expect(dadosPorDia).to.have.property(dataFormatada);
    });
  });
});