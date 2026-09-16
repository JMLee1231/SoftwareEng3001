class StockPortfolio {
  constructor() {
    this.holdings = new Map();
  }

  isEmpty() {
    return this.holdings.size === 0;
  }

  purchase(symbol, shares) {
    const currentShares = this.getShares(symbol);
    const updatedShares = currentShares + shares;

    if (updatedShares === 0) {
      this.holdings.delete(symbol);
      return;
    }

    this.holdings.set(symbol, updatedShares);
  }

  sell(symbol, shares) {
    const currentShares = this.getShares(symbol);

    if (shares > currentShares) {
      throw new Error("Not possible to sell this number of shares.");
    }

    const remainingShares = currentShares - shares;

    if (remainingShares === 0) {
      this.holdings.delete(symbol);
      return;
    }

    this.holdings.set(symbol, remainingShares);
  }

  symbolCount() {
    return this.holdings.size;
  }

  getShares(symbol) {
    return this.holdings.get(symbol) ?? 0;
  }
}

module.exports = StockPortfolio;
