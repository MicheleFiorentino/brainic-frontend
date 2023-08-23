import { BrainWaves } from "./brainwaves.enum";

export const intFirstRowActive = 0;
export const intLastRowActive = 1023;
export const intFirstRowRest = 1024;
export const intLastRowRest = 2047;
export const genericStartRow = 0;
export const genericLastRow = 1023;  //both active and rest files have 1024 rows
export const intFirstCol = 0;        //both active and rest
export const intLastCol = 139;       //both active and rest

export function extractActiveEEGData(eegFile: string): number[][][]{
  return extractEEGData(eegFile, intFirstRowActive, intLastRowActive);
}

export function extractRestEEGData(eegFile: string): number[][][]{
  return extractEEGData(eegFile, intFirstRowRest, intLastRowRest);
}

//there are 5 bandwidth intercepted by 14 electrodes.
//each row is a measurement of an istant, for 128 measurment in a second, for 8 seconds (1024 measurments)
//the columns from 1 to 140 are the electrodes measurments, 70 mean (what we want) and 70 standard deviation (not interesting)
//we have to filter only the means, and divide them by the 5 bandwidths
function extractEEGData(eegFile: string, intFirstRow: number, intLastRow: number): number[][][]{
  let eegData: number[][][] = [];

  //extracting from the csv file only the means (we descard the std deviation) and reducing the columns to desired ones
  let eegFileMeans: string = filterFileMeans(eegFile, intFirstRow, intLastRow);

  //from the refined file, we get 5 files. Each file is a different bandwidth
  let deltaFile = getBandWidthFileData(eegFileMeans, BrainWaves.DELTA, genericStartRow, genericLastRow);
  let thetaFile = getBandWidthFileData(eegFileMeans, BrainWaves.THETA, genericStartRow, genericLastRow);
  let alphaFile = getBandWidthFileData(eegFileMeans, BrainWaves.ALPHA, genericStartRow, genericLastRow);
  let betaFile = getBandWidthFileData(eegFileMeans, BrainWaves.BETA, genericStartRow, genericLastRow);
  let gammaFile = getBandWidthFileData(eegFileMeans, BrainWaves.GAMMA, genericStartRow, genericLastRow);

  //We convert each bandwith (that is a string) in an array of numbers. Each element represents a different electrode
  eegData.push(convertBandWidthFileToNumberArrays(deltaFile));
  eegData.push(convertBandWidthFileToNumberArrays(thetaFile));
  eegData.push(convertBandWidthFileToNumberArrays(alphaFile));
  eegData.push(convertBandWidthFileToNumberArrays(betaFile));
  eegData.push(convertBandWidthFileToNumberArrays(gammaFile));

  return eegData;
}

//the means are the pair columns, we get only the first 70 values
function filterFileMeans(eegFile: string, intFirstRow: number, intLastRow: number): string {
  let rowsArray = eegFile.split('\n'); // Split the file into rows

  // Extract the desired rows within the specified range
  let desiredRows = rowsArray.slice(intFirstRow, intLastRow + 1);

  let eegFileMeans: string = '';

  let pairsColumnArray = [];
  for (let row of desiredRows) {
    let columnArray = row.split(','); // Split each row into columns
    let desiredColumns = columnArray.slice(intFirstCol, intLastCol + 1); // Extract the desired columns

    for (let j = 0; j < desiredColumns.length; j += 2) {
      pairsColumnArray.push(desiredColumns[j]);
    }

    let rowMeans = pairsColumnArray.join(',');
    eegFileMeans += rowMeans + '\n';
    pairsColumnArray = []; // Clear the array for the next row
  }
  return eegFileMeans;
}

//in the csv file (without the std deviation) we have in sequence, for each electrode, the 5 bandwidth.
//in order they are DELTA, THETA, ALPHA, BETA, GAMMA. So, each 5 camps refers to the same electrode. The next 5 to another, and so on.
//Extracting the index from the enum, we can get the right index from each bandwith (0 for DELTA, 1 for THETA, ...) moving at each iteration
//5 times forward.
function getBandWidthFileData(eegFile: string, bwchart: BrainWaves, intFirstRow: number, intLastRow: number) : string{
  let rowsArray = eegFile.split('\n'); // Split the file into rows
  let waveIdx = bwchart;

  // Extract the desired rows within the specified range
  let desiredRows = rowsArray.slice(intFirstRow, intLastRow + 1);

  let bandwidthFile: string = '';

  let pairsColumnArray = [];
  for (let row of desiredRows) {
    let columnArray = row.split(','); // Split each row into columns

    for (let j = waveIdx; j < columnArray.length; j += 5) {
      pairsColumnArray.push(columnArray[j]);
    }

    let rowMeans = pairsColumnArray.join(',');
    bandwidthFile += rowMeans + '\n';
    pairsColumnArray = []; // Clear the array for the next row
  }
  return bandwidthFile;
}

//nb: right now, in a file we have the Hz on the
function convertBandWidthFileToNumberArrays(bandwidthFile: string): number[][] {
  const rows: string[] = bandwidthFile.split('\n');
  const data: number[][] = [];

  // Initialize an array for each column
  for (let i = 0; i < 14; i++) {
    data.push([]);
  }

  for (const row of rows) {
    const cols: string[] = row.split(',');

    // Iterate over each column and push the value to the corresponding column array
    for (let i = 0; i < 14; i++) {
      const value: number = parseFloat(cols[i]);
      if (!isNaN(value)) {
        data[i].push(value);
      }
    }
  }

  return data;
}
