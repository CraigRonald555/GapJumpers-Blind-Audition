import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import * as Chart from 'chart.js';
import { GraphService } from '../graph.service';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  firebaseData;

  public barChartOptions: Chart.ChartOptions = {
    responsive: true,
  };

  // barChartLabelsArray = [];
  // barChartDataArray = [];

  barChartLabels: Label[] = [] //= ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartLabels2: Label[] = []
  barChartType: Chart.ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: Chart.ChartDataSets[] =  [
    { data: [], backgroundColor: '#28a745', hoverBackgroundColor: '#28a745', label: 'Male' },
    { data: [], backgroundColor: '#17a2b8', hoverBackgroundColor: '#17a2b8', label: 'Female' }
  ];
  barChartData2: Chart.ChartDataSets[] =  [
    { data: [], backgroundColor: '#28a745', hoverBackgroundColor: '#28a745', label: 'Male' },
    { data: [], backgroundColor: '#17a2b8', hoverBackgroundColor: '#17a2b8', label: 'Female' }
  ];

  constructor(private firebaseService: FirebaseService, private changeDetector: ChangeDetectorRef, private graphService: GraphService) {

    this.retrieveData();

  }

  addToDisposition(job, disposition, gender){

    let genderDisposition;

    if (gender === 'm') {
      genderDisposition  = 'maleDispositions';
    } else {
      genderDisposition = 'femaleDispositions'
    }

    // Try to add to the total of the disposition
    try {

      // console.log(typeof this.firebaseData[job]['maleDispositions'][disposition]);
      if (this.firebaseData[job][genderDisposition][disposition] == null) {
        this.firebaseData[job][genderDisposition][disposition] = 1
      } else {
        this.firebaseData[job][genderDisposition][disposition]++
      }

    } catch(error) {

      this.firebaseData[job][genderDisposition] = {[disposition]: 1}

    }

  }

  // addToDispositionTemp(job, disposition, gender, tempIndex){

  //   if (gender === 'm') {
  //     gender  = 'male';
  //   } else {
  //     gender = 'female'
  //   }

  //   // Most tedious part of the program. Have to check each level of the object exists by using try/catch
  //   try {

  //     this.firebaseData[job]['Disposition'];
  //     //First level exists, check second does
  //     try {

  //       this.firebaseData[job]['Disposition'][disposition];
  //       console.log(`${tempIndex}. ${disposition} - ${gender}: First level exists`);

  //       //Second level exists, check third does
  //       try {

  //         //Try incrementing
  //         this.firebaseData[job]['Disposition'][disposition][gender]++;
  //         console.log(`${tempIndex}. ${disposition} - ${gender}: Second level exists, gender incremented: ${this.firebaseData[job]['Disposition'][disposition][gender]}`);

  //         //Third level doesn't exist, create it
  //       } catch (error) {

  //         console.log(`${tempIndex}. ${disposition} - ${gender}: Didn't exist - added at third catch`);
  //         this.firebaseData[job]['Disposition'][disposition][gender] = 1;

  //       }

  //       //Second level doesn't exist, create 2nd and third
  //     } catch (error) {

  //       console.log(`${tempIndex}. ${disposition} - ${gender}: Didn't exist - added at 2nd catch`);
  //       this.firebaseData[job]['Disposition'][disposition] = {};
  //       this.firebaseData[job]['Disposition'][disposition][gender] = 1;

  //     }

  //     //First level doesn't exist, create all three
  //   } catch (error) {

  //     console.log(`${tempIndex}. ${disposition} - ${gender}: Didn't exist - added at first catch`);
  //     this.firebaseData[job]['Disposition'] = {};
  //     this.firebaseData[job]['Disposition'][disposition] = {};
  //     this.firebaseData[job]['Disposition'][disposition][gender] = 1;


  //   }

  //   // Try to add to the total of the disposition
  //   // try {

  //   //   this.firebaseData[job]['Disposition'][disposition][gender]++;

  //   //   if(disposition === 'Not Contacted/Interviewed') {
  //   //     console.log('Passed');
  //   //     console.log(gender);
  //   //     console.log(this.firebaseData[job]['Disposition'][disposition][gender])

  //   //   }

  //   // } catch(error) {

  //   //   console.log(error);

  //   //   this.firebaseData[job]['Disposition'] = {[disposition]: {[gender]: 1}};

  //   //   if(disposition === 'Not Contacted/Interviewed') {
  //   //     console.log(this.firebaseData[job]['Disposition'])
  //   //     console.log(this.firebaseData[job]['Disposition'][disposition])
  //   //     console.log(this.firebaseData[job]['Disposition'][disposition][gender])
  //   //   }
  //   //   // console.log(this.firebaseData[job]['Disposition'][disposition][genderDisposition])

  //   // }

  // }

  // async retrieveDataTemp() {

  //   this.firebaseData = await this.firebaseService.retrieveData("jobs");

  //   for(let currentJob in this.firebaseData) {

  //     let maleCount = 0;
  //     let femaleCount = 0;

  //     for(let j = 0; j < this.firebaseData[currentJob].length; j++) {

  //       const applicantGender = this.firebaseData[currentJob][j]['gender'];

  //       // console.log("Current applicant gender: ");
  //       // console.log(applicantGender);

  //       if(applicantGender === 'm') {
  //         ++maleCount;
  //         this.addToDisposition(currentJob, this.firebaseData[currentJob][j]['disposition'], 'm', j);
  //       }
  //       if(applicantGender === 'f') {
  //          ++femaleCount;
  //          this.addToDisposition(currentJob, this.firebaseData[currentJob][j]['disposition'], 'f', j);
  //       }

  //     }

  //     this.firebaseData[currentJob].maleCount = maleCount;
  //     this.firebaseData[currentJob].femaleCount = femaleCount;

  //   }

  //   console.log(this.firebaseData);

  //   this.retrieveChart();

  // }

  async retrieveData() {

    this.firebaseData = await this.firebaseService.retrieveData("jobs");

    for(let currentJob in this.firebaseData) {

      let maleCount = 0;
      let femaleCount = 0;

      for(let j = 0; j < this.firebaseData[currentJob].length; j++) {

        const applicantGender = this.firebaseData[currentJob][j]['gender'];

        // console.log("Current applicant gender: ");
        // console.log(applicantGender);

        if(applicantGender === 'm') {
          ++maleCount;
          this.addToDisposition(currentJob, this.firebaseData[currentJob][j]['disposition'], 'm');
        }
        if(applicantGender === 'f') {
           ++femaleCount;
           this.addToDisposition(currentJob, this.firebaseData[currentJob][j]['disposition'], 'f');
        }

      }

      this.firebaseData[currentJob].maleCount = maleCount;
      this.firebaseData[currentJob].femaleCount = femaleCount;

    }

    console.log(this.firebaseData);

    this.retrieveManagerChart();
    this.retrieveAdvisorChart();

  }

  retrieveAdvisorChart() {

    // ------------------------------------------------------------------------- initial code

    const maleDispositions = this.firebaseData['Relationship Advisor']['maleDispositions']
    const femaleDispositions = this.firebaseData['Relationship Advisor']['femaleDispositions']
    // console.log(dispositions);

    const femaleDispositionsTotals = [];
    const femaleDispositionsLabels = [];

    const maleDispositionsTotals = [];
    const maleDispositionsLabels = [];

    for(let maleDisposition in maleDispositions) {

      maleDispositionsLabels.push(maleDisposition);
      maleDispositionsTotals.push(maleDispositions[maleDisposition]);

    }

    // this.barChartData[i].label = maleDisposition;
    // this.barChartData[i].data.push(maleDispositions[maleDisposition])

    for(let femaleDisposition in femaleDispositions) {

      console.log(femaleDisposition);

      femaleDispositionsLabels.push(femaleDisposition);
      femaleDispositionsTotals.push(femaleDispositions[femaleDisposition]);

    }

    console.log(maleDispositionsLabels);
    console.log(maleDispositionsTotals);
    console.log(femaleDispositionsLabels);
    console.log(femaleDispositionsTotals);

    const displayData = this.mergeArrays(maleDispositionsLabels, maleDispositionsTotals, femaleDispositionsLabels, femaleDispositionsTotals);
    console.log(displayData);

    this.barChartLabels2.push(...displayData.labels);
    console.log(this.barChartLabels);

    this.barChartData2[0].data.push(...displayData.maleTotals)
    console.log(this.barChartData[0]);
    this.barChartData2[1].data.push(...displayData.femaleTotals)
    console.log(this.barChartData[1]);

  }

  retrieveManagerChart() {

    // ------------------------------------------------------------------------- initial code

    const maleDispositions = this.firebaseData['Relationship Manager']['maleDispositions']
    const femaleDispositions = this.firebaseData['Relationship Manager']['femaleDispositions']
    // console.log(dispositions);

    const femaleDispositionsTotals = [];
    const femaleDispositionsLabels = [];

    const maleDispositionsTotals = [];
    const maleDispositionsLabels = [];

    for(let maleDisposition in maleDispositions) {

      maleDispositionsLabels.push(maleDisposition);
      maleDispositionsTotals.push(maleDispositions[maleDisposition]);

    }

    // this.barChartData[i].label = maleDisposition;
    // this.barChartData[i].data.push(maleDispositions[maleDisposition])

    for(let femaleDisposition in femaleDispositions) {

      console.log(femaleDisposition);

      femaleDispositionsLabels.push(femaleDisposition);
      femaleDispositionsTotals.push(femaleDispositions[femaleDisposition]);

    }

    console.log(maleDispositionsLabels);
    console.log(maleDispositionsTotals);
    console.log(femaleDispositionsLabels);
    console.log(femaleDispositionsTotals);

    const displayData = this.mergeArrays(maleDispositionsLabels, maleDispositionsTotals, femaleDispositionsLabels, femaleDispositionsTotals);
    console.log(displayData);

    this.barChartLabels.push(...displayData.labels);
    console.log(this.barChartLabels);

    this.barChartData[0].data.push(...displayData.maleTotals)
    console.log(this.barChartData[0]);
    this.barChartData[1].data.push(...displayData.femaleTotals)
    console.log(this.barChartData[1]);

    // -------------------------------------------- In progress - Code which allows data binding in ngFor loop

    // const maleDispositions = [];
    // const femaleDispositions = [];

    // let index = 0
    // for(let job in this.firebaseData) {

    //   maleDispositions.push(this.firebaseData[job]['maleDispositions']);
    //   femaleDispositions.push(this.firebaseData[job]['femaleDispositions']);

    //   const femaleDispositionsTotals = [];
    //   const femaleDispositionsLabels = [];

    //   const maleDispositionsTotals = [];
    //   const maleDispositionsLabels = [];

    //   for(let maleDisposition in maleDispositions[index]) {

    //     maleDispositionsLabels.push(maleDisposition);
    //     maleDispositionsTotals.push(maleDispositions[index][maleDisposition]);

    //   }

    //   // this.barChartData[i].label = maleDisposition;
    //   // this.barChartData[i].data.push(maleDispositions[maleDisposition])

    //   for(let femaleDisposition in femaleDispositions[index]) {

    //     console.log(femaleDisposition);

    //     femaleDispositionsLabels.push(femaleDisposition);
    //     femaleDispositionsTotals.push(femaleDispositions[index][femaleDisposition]);

    //   }

    //   console.log('Male dispositions:');
    //   console.log(maleDispositionsLabels);
    //   console.log(maleDispositionsTotals);
    //   console.log('Female dispositions:');
    //   console.log(femaleDispositionsLabels);
    //   console.log(femaleDispositionsTotals);

    //   const displayData = this.mergeArrays(maleDispositionsLabels, maleDispositionsTotals, femaleDispositionsLabels, femaleDispositionsTotals);
    //   console.log(displayData);

    //   this.barChartLabels.push(...displayData.labels);
    //   console.log(this.barChartLabels);

    //   this.barChartData[0].data.push(...displayData.maleTotals)
    //   console.log(this.barChartData[0]);
    //   this.barChartData[1].data.push(...displayData.femaleTotals)
    //   console.log(this.barChartData[1]);


    //   this.barChartDataArray.push(this.barChartData);
    //   this.barChartLabelsArray.push(this.barChartLabels);

    //   console.log(this.barChartDataArray[0])
    //   console.log(this.barChartDataArray[1])

    //   index++;

    // }

  }

  mergeArrays(maleLabels, maleTotals, femaleLabels, femaleTotals) {

    let newArray = { labels: [], femaleTotals: [], maleTotals: []};

    for (let i = 0; i < maleLabels.length; i++) {

      const mLabel = maleLabels[i];
      newArray.labels.push(mLabel);
      newArray.maleTotals.push(maleTotals[i]);

      const correspondingFemaleTotal = this.getDispositionTotal(femaleLabels, femaleTotals, mLabel);
      newArray.femaleTotals.push(correspondingFemaleTotal);


    }

    for (let i = 0; i < femaleLabels.length; i++) {

      const fLabel = femaleLabels[i];

      // Make sure we haven't already added the corresponding label and male value in the loop above
      if (!this.checkValueInArray(fLabel, newArray.labels)) {

      } else {

        newArray.labels.push(fLabel)
        newArray.femaleTotals.push(femaleTotals[i]);

        // If label wasn't already in newArray.labels then the corresponding maleTotal will be zero
        newArray.maleTotals.push(0);

      }


    }

    return newArray;

  }

  getDispositionTotal(labels, totals, disposition) {

    let total = 0

    for (let i = 0; i < labels.length; i++) {

      const currentLabel = labels[i];
      const currentTotal = totals[i];

      if(currentLabel === disposition) {

        total = currentTotal;

      }

    }

    return total;

  }

  checkValueInArray(value, array) {

    let found = false;

    for(let i = 0; i < array.length; i++) {

      if(value === array[i]) { found = true }

    }

    return true;

  }

  ngOnInit(): void {

  }

}
