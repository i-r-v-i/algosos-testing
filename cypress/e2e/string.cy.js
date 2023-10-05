describe("строка", () => {
  const word = "task";
  const arr = word.split("");
  const CircleBorder = {
    Default: "rgb(0, 50, 255)",
    Changing: "rgb(210, 82, 225)",
    Modified: "rgb(127, 224, 81)",
  };
  beforeEach(() => {
    cy.visit("/recursion");
    cy.get('[data-cy="input-str"]').type(word);
  });
  it("проверка блокировки кнопки при пустом инпуте", () => {
    cy.get('[data-cy="input-str"]').clear();
    cy.get('[data-cy="button-str"]').should("be.disabled");
  });
  it("алгоритм разворота строки выполняется корректно", () => {
    cy.get('[data-cy="button-str"]').click();
    cy.get('[data-cy="circle-content"]').should((circles) => {
      expect(circles).to.have.length(word.length);
    });
    cy.get('[data-cy="circle"]').should("have.css", "border-color", CircleBorder.Default);

    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      cy.wait(1000);
      cy.get('[data-cy="circle-content"]').eq(start).should("contain", arr[start]);
      cy.get('[data-cy="circle"]')
        .eq(start)
        .should("have.css", "border-color", CircleBorder.Changing);
      cy.get('[data-cy="circle-content"]').eq(end).should("contain", arr[end]);
      cy.get('[data-cy="circle"]')
        .eq(end)
        .should("have.css", "border-color", CircleBorder.Changing);
      cy.wait(1000);
      cy.get('[data-cy="circle-content"]').eq(start).should("contain", arr[end]);
      cy.get('[data-cy="circle"]')
        .eq(start)
        .should("have.css", "border-color", CircleBorder.Modified);
      cy.get('[data-cy="circle-content"]').eq(end).should("contain", arr[start]);
      cy.get('[data-cy="circle"]')
        .eq(end)
        .should("have.css", "border-color", CircleBorder.Modified);
      start++;
      end--;
    }
  });
});