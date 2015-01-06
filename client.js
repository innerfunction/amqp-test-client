var host = process.argv[2];
var queue = process.argv[3];
if( !(host && queue) ) {
    console.log('node client.js <host> <queue name>');
}
else {
    var amqp = require('amqplib/callback_api');
    amqp.connect('amqp://'+host, function process( err, conn ) {
        if( err ) {
            console.log('Connect error: '+err );
        }
        else conn.createChannel(function listen( err, ch ) {
            if( err ) {
                console.log('Listen error: '+err );
            }
            else {
                ch.assertQueue( queue );
                ch.consume( queue, function receive( msg ) {
                    console.log('Receive: '+msg.content );
                    ch.ack( msg );
                });
            }
        });
    });
}
