const { Client } = require('pg');
const xlsx = require('xlsx');
const { SingleBar } = require('cli-progress');
const cliProgress = require('cli-progress');

async function addOwners() {
    const client = new Client({
      host: "127.0.0.1",
      port: 5432,
      database: "strapi",
      user: "postgres",
      password: "postgres",
      ssl: false
    });

    try {
      // Connect to the database
      await client.connect();
      console.log('Connected to PostgreSQL database');

      // Read Excel file
      const workbook = xlsx.readFile('./owners_data.xlsx');
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
      const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
      progressBar.start(data.length, 0);
  
      // Insert data into the "owners" table
      let i = 1;
      for (const row of data) {
        const { Index, 'Source File': Source_File, 'P-NUMBER': P_NUMBER, PHASE, AREA, 'PLOT NUMBER': PLOT_NUMBER, 'BUILDING NAME': BUILDING_NAME, 'REGISTRATION NUMBER': REGISTRATION_NUMBER, 'VILLA NUMBER': VILLA_NUMBER, 'FLAT NUMBER': FLAT_NUMBER, NAME, PHONE, PHONE2, EMAIL, MOBILE, 'SECONDARY MOBILE': SECONDARY_MOBILE, 'BALCONY AREA': BALCONY_AREA, 'PARKING NUMBER': PARKING_NUMBER, 'COMMON AREA': COMMON_AREA, FLOOR, 'ROOMS DESCRIPTION': ROOMS_DESCRIPTION, LEVELS, SHOPS, FLATS, OFFICES, AGE, 'ACTUAL AREA': ACTUAL_AREA, 'MUNICIPALITY NUMBER': MUNICIPALITY_NUMBER, 'MASTER PROJECT': MASTER_PROJECT, PROJECT, 'Zip Code': ZIP_CODE, 'Registrion date': REGISTRATION_DATE, 'PROPERTY TYPE': PROPERTY_TYPE } = row;

        const query = `
          INSERT INTO owners (
            index, source_file, p_number, phase, area, plot_number, building_name, registration_number, villa_number, flat_number, name, phone, phone_2, email, mobile, secondary_mobile, balcony_area, parking_number, common_area, floor, rooms_description, levels, shops, flats, offices, age, actual_area, municipality_number, master_project, project, zip_code, registration_date, property_type
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)
        `;
        const values = [Index, Source_File, P_NUMBER, PHASE, AREA, PLOT_NUMBER, BUILDING_NAME, REGISTRATION_NUMBER, VILLA_NUMBER, FLAT_NUMBER, NAME, PHONE, PHONE2, EMAIL, MOBILE, SECONDARY_MOBILE, BALCONY_AREA, PARKING_NUMBER, COMMON_AREA, FLOOR, ROOMS_DESCRIPTION, LEVELS, SHOPS, FLATS, OFFICES, AGE, ACTUAL_AREA, MUNICIPALITY_NUMBER, MASTER_PROJECT, PROJECT, ZIP_CODE, REGISTRATION_DATE, PROPERTY_TYPE];
        await client.query(query, values);
        // Update progress bar
        progressBar.update(i + 1);
    }
    progressBar.stop();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Close the database connection
      await client.end();
      console.log('Disconnected from PostgreSQL database');
    }
}

addOwners()