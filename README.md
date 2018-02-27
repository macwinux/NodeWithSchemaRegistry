# NodeWithSchemaRegistry
A node.js microservice that insert data in kafka and at the same time use schema registry for register the avro schema

You need to post your schema in the schema registry:

curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" \
    --data '{"schema": "{\"type\": \"record\",\"namespace\":\"com.example.universia\",\"name\":\"MyAwesomeType\",\"fields\":[{\"doc\": \"Timestamp of the booking\",\"name\": \"timestamp\",\"type\": \"double\"},{\"doc\": \"Account Identification IBAN\",\"name\": \"accountId\",\"type\": \"string\"},{\"doc\": \"Account Currency\",\"name\": \"accountCurrency\",\"type\": \"string\"},{\"doc\": \"Booking Amount Numeric\",\"name\": \"bookingAmountNumeric\",\"type\": \"double\"},{\"doc\": \"Booking Amount\",\"name\": \"bookingAmount\",\"type\": \"string\"},{\"doc\": \"Booking Credit Debit Indicator\",\"name\": \"bookingCreditDebitIndicator\",\"type\": \"string\"},{\"doc\": \"Balance After Booking Numeric\",\"name\": \"BalanceAfterBookingNumeric\",\"type\": \"long\"}]}"}' http://${IP_SCHEMA}/subjects/test-value/versions

This curl bring back a Id, you need insert this id in the config.js.
You need also specify the topic where you want to save the data and you need to create a environment variable where you will have the brokers ip:

export broker_url = localhost:9091



    
    
