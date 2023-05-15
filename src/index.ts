import 'dotenv/config';
import app from './app';
import { init } from './database/connection';
import { initDb } from './database/initDb';

const PORT = process.env.PORT || 3000;


const main = async () => {
    init();
    app.listen(PORT, () => {
        initDb()
        console.log('Server running on port:', PORT);
    });

}

main();