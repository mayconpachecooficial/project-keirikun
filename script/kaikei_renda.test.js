import { expect } from 'chai';
import { JSDOM } from 'jsdom';

// Mock the DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="btn-add"></div></body></html>');
global.document = dom.window.document;

// Import the function to be tested
import { addkamoku } from './kaikei_renda';

describe('addkamoku', () => {
  beforeEach(() => {
    // Clear the btn-add element before each test
    const btnAddElement = document.getElementById('btn-add');
    btnAddElement.innerHTML = '';
  });

  it('should add a new category when called', () => {
    // Call the function to add a new category
    addkamoku();

    // Get the category element
    const categoryElement = document.querySelector('.category-select-button');

    // Expect the category element to exist
    expect(categoryElement).to.exist;

    // Expect the category element to have the correct HTML structure
    expect(categoryElement.innerHTML).to.equal(`
      <img src='./image/icon_add.png' width="40"/>
      <div><span>科目追加</span></div>
    `);
  });
});