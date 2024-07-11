import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class DbService {
  private readonly filePath = 'file.json';

  // Método para escribir en el archivo JSON de manera síncrona
  writeToFile(data: {email: string, code: string}): void {
    const existingData = this.readFromFile();
    const dataToInsert = {
     [ data.email]: data.code,
    }
    
    // Merge existing data with new data
    const updatedData = { ...existingData, ...dataToInsert };

    // Write the updated data back to the file
    fs.writeFileSync(this.filePath, JSON.stringify(updatedData, null, 2));
  }

  getCodeByEmail(email:string) {
    const data = this.readFromFile();
    console.log('dsdasd', data)
    const found = Object.keys(data).find((e) => e == email);
    return data[found];
  }

  // Método para leer desde el archivo JSON de manera síncrona
  readFromFile(): any {
    try {
      if (!fs.existsSync(this.filePath)) {
        // If the file doesn't exist, create it with an empty object
        fs.writeFileSync(this.filePath, JSON.stringify({}));
      }
      const data = fs.readFileSync(this.filePath, 'utf8');
      return data ? JSON.parse(data) : {};
    } catch (error) {
      // Handle error appropriately (e.g., file not found, invalid JSON, etc.)
      console.error(`Error reading file ${this.filePath}:`, error);
      return {}; // Return empty object if there's an error
    }
  }
}
