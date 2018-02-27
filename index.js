const config = require('./config.js');
const avro = require('avsc');
const Kafka = require('node-rdkafka');
var i=0;
const type = avro.parse(config.avroSchema);

const kafkaConf = {
'metadata.broker.list':  process.env.broker_url.split(","), // Connect to a Kafka instance on localhost
'dr_cb': true,
"debug": "generic,broker,security",
"socket.keepalive.enable": true
};

const producer = new Kafka.Producer(kafkaConf);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// For this demo we just log client errors to the console.

function getRandomAccountId(numberField) {
  return `ES${numberField}`;
}

function getRandomAccountCurrency(timestamp) {
  return `${timestamp}`;
}

function getRandomBookingCreditDebitIndicator(numberField) {
  return `CC-${numberField}`;
}

function getRandomBookingAmount(numberField) {
  return `${Math.trunc(numberField)}`;
}

var promiseProducer = new Promise(function (resolve, reject){
  producer.on('ready', function(arg) {
      console.log(`producer ${arg.name} ready.`);
      resolve(producer);
  });
})

function sendToProducer (payload) { 
  promiseProducer.then(function(producer){
    producer.produce(config.topic, -1, payload, i);
    console.log(`mensaje numero ${i}`);
    i = i + 1;
  })
  .catch((error) => {
    console.error(error);
  });
}  



    // Create message and encode to Avro buffer



  setInterval(function(){
        var numberField = getRandomArbitrary(0,1000000000);
        var accountId = getRandomAccountId(numberField);
        var accountCurrency = getRandomAccountCurrency(Date.now());
        var bookingAmount = getRandomBookingAmount(numberField);
        var bookingCreditDebitIndicator = getRandomBookingCreditDebitIndicator(numberField);
        var messageBuffer = type.toBuffer({
              timestamp: Date.now(),
              accountId: accountId,
              accountCurrency: accountCurrency,
              bookingAmountNumeric: numberField,
              bookingAmount: bookingAmount,
              bookingCreditDebitIndicator: bookingCreditDebitIndicator,
              BalanceAfterBookingNumeric: 1000
            });

        var schema = new Buffer(5);
        schema[0]=0;
        schema.writeUInt32BE(config.schemaId,1);
        var buf = Buffer.concat([schema,messageBuffer]);
        //Send payload to Kafka and log result/error
        //producer.produce(topic, partitioner, value, key)
      //Send payload to Kafka and log result/error
      sendToProducer(buf);
      /*producer.produce(config.topic, -1, messageBuffer, i);
      i = i+1; 
      console.log(`mensaje numero ${i}`);  
      console.log(`mensaje: ${numberField}`);*/
      
  },1000);


  // For this demo we just log producer errors to the console.
producer.on("disconnected", function(arg) {
  console.log('producer disconnected. ' + JSON.stringify(arg));
  process.exit();
});

producer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
producer.on('event.log', function(log) {
  console.log(log);
});
producer.connect();


