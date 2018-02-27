module.exports = {
 topic: 'test1',
 brokers: process.env.broker_url,
 schemaId: 22,
 avroSchema: {
    name: 'MyAwesomeType',
    type: 'record',
    fields: [
      {
      "doc": "Timestamp of the booking",
      "name": "timestamp",
      "type": "double"
    },
    {
      "doc": "Account Identification IBAN",
      "name": "accountId",
      "type": "string"
    },
    {
      "doc": "Account Currency",
      "name": "accountCurrency",
      "type": "string"
    },
    {
      "doc": "Booking Amount Numeric",
      "name": "bookingAmountNumeric",
      "type": "double"
    },
    {
      "doc": "Booking Amount",
      "name": "bookingAmount",
      "type": "string"
    },
    {
      "doc": "Booking Credit Debit Indicator",
      "name": "bookingCreditDebitIndicator",
      "type": "string"
    },
    {
      "doc": "Balance After Booking Numeric",
      "name": "BalanceAfterBookingNumeric",
      "type": "long"
    }
    ]
  }
}
