const StockPortfolio = require("./stock-portfolio");

/*
 * TDD reflection — replace this brief draft with your own honest experience before
 * submitting: Working in small red-green-refactor steps made it easier to focus on
 * one portfolio behavior at a time. The tests also made the behavior around removing
 * a zero-share symbol and rejecting an oversell explicit before implementation.
 */

describe("StockPortfolio", () => {
  test("2.1 creates a portfolio", () => {
    const portfolio = new StockPortfolio();

    expect(portfolio).toBeInstanceOf(StockPortfolio);
  });

  test("2.2 starts empty", () => {
    const portfolio = new StockPortfolio();

    expect(portfolio.isEmpty()).toBe(true);
  });

  test("2.3 purchases shares and makes the portfolio non-empty", () => {
    const portfolio = new StockPortfolio();

    portfolio.purchase("GME", 5);

    expect(portfolio.isEmpty()).toBe(false);
  });

  test("2.4 sells shares", () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase("GME", 5);

    portfolio.sell("GME", 5);

    expect(portfolio.isEmpty()).toBe(true);
  });

  test("2.5 counts unique ticker symbols", () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase("GME", 5);
    portfolio.purchase("RBLX", 10);
    portfolio.purchase("GME", 3);

    expect(portfolio.symbolCount()).toBe(2);
  });

  test("2.6 removes a ticker when its last share is sold", () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase("GME", 5);

    portfolio.sell("GME", 5);

    expect(portfolio.symbolCount()).toBe(0);
  });

  test("2.7 returns the number of shares for a symbol, or zero when absent", () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase("GME", 5);
    portfolio.purchase("GME", 3);

    expect(portfolio.getShares("GME")).toBe(8);
    expect(portfolio.getShares("RBLX")).toBe(0);
  });

  test("2.8 rejects sales larger than the number of owned shares", () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase("GME", 5);

    expect(() => portfolio.sell("GME", 6)).toThrow(
      "Not possible to sell this number of shares.",
    );
  });
});
