class CreditScoreCalculator {
    /**
     * Total number of transactions.
     * @private
     */
    private totalTransactions: number;
  
    /**
     * Total order amount.
     * @private
     */
    private totalOrderAmount: number;
  
    /**
     * Creates an instance of CreditScoreCalculator.
     */
    constructor() {
      /**
       * Initialize totalTransactions to 0.
       * @type {number}
       * @private
       */
        this.totalTransactions = 0;
  
      /**
       * Initialize totalOrderAmount to 0.
       * @type {number}
       * @private
       */
      this.totalOrderAmount = 0;
    }
  
    /**
     * Add a new transaction to the calculator.
     * @param {number} orderAmount - The amount of the order.
     * @returns {void}
     */
    addTransaction(orderAmount: number): void {
      /**
       * Increment totalTransactions by 1.
       * @type {number}
       * @private
       */
      this.totalTransactions++;
  
      /**
       * Add the orderAmount to totalOrderAmount.
       * @type {number}
       * @private
       */
      this.totalOrderAmount += orderAmount;
    }
  
    /**
     * Calculate the credit score based on the total order amount and transactions.
     * @returns {number} - The calculated credit score.
     */
    calculateCreditScore(): number {
      /**
       * If there are no transactions, return 0 to avoid division by zero.
       */
      if (this.totalTransactions === 0) {
        return 0;
      }
  
      /**
       * Calculate and return the credit score.
       * @type {number}
       */
      return this.totalOrderAmount / (this.totalTransactions * 100);
    }
  }
  
  export default CreditScoreCalculator;  