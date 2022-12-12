import React, { useEffect } from 'react';

import {Box, Typography, ThemeProvider, createTheme} from '@mui/material';
//import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';

import './ArticleFind.css';
import {ExportToExcel} from './ExportToExcel'
import { MuscHeader } from './MuscDecs';


export interface ApiObject {
    PubMedID: string | undefined
}

const style1 = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 120,
    left: 'auto',
    position: 'fixed',
};

const style2 = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};


const theme = createTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 14,
      fontWeightBold: 700,
      

    },
  });

export function FloatingActionButtons() {
    return (
        <>
      <Box sx={style1}>
        <a href="https://drive.google.com/uc?export=download&id=1ei1LEpHbaZ84GTX7oi5tjSK2iRiUBX7m" target="_blank">
        <ThemeProvider theme={theme}>
        <Typography align="center">
            Download free PDFs
            <br />
            with PDF Finder App:
            <br />
            Available only on Windows
        </Typography>
        </ThemeProvider>
        <Fab color="primary" aria-label="add" variant="extended" >
          <GetAppRoundedIcon />
          PDF Finder App
        </Fab>
        </a>
      </Box>
        
    <Box sx={style2}>
    <a href="https://docs.google.com/document/d/1JEm3Vp3gSRtIy6xaStS4PDLaBW9E_zeA/export?format=pdf" target="_blank">
    <ThemeProvider theme={theme}>
        <Typography align="center">
        Download installation guide
        <br />
        for PDF Finder App
        </Typography>
        </ThemeProvider>
    <Fab color="primary" aria-label="add" variant="extended" >
    <GetAppRoundedIcon />
    Installation Manual
    </Fab>
    </a>
    </Box>
</>);
  }

const ArticleFind: React.FC = () => {
    const [id1, setID1] = React.useState<string>("")
    const [id2, setID2] = React.useState<string>("")
    const [fileName, setFileName] = React.useState<string>("")
    //const [data, setData] = React.useState<ApiObject>({PubMedID : ""})

    useEffect(() => {
        if (id1 !== ""){
            setID2(() => "");
            setAPI1List([])
        } else {
            setID1(() => "");
            setAPI1List([])
        }
      }, [id1]);

    
    useEffect(() => {
        if (id2 !== ""){
            setID1(() => "");
            setAPI1List([])
        } else {
            setID2(() => "");
            setAPI1List([])
        }
      }, [id2]);


    const [apiList, setAPI1List] = React.useState<ApiObject[]>([]);

    const api1 = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/elink.fcgi?dbfrom=pubmed&linkname=pubmed_pubmed_citedin&id="
    const api2 = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/elink.fcgi?dbfrom=pubmed&linkname=pubmed_pubmed_refs&id="

    
    const getData = (id: string | undefined, url: string, fileName: string) => {
        //const id = 21876726, 21645191;
        setFileName(fileName);

        if (id !== ""){

        const request = `${url}${id}`
        console.log("request", request)

        // 1. Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // 2. Configure it: GET-request for the URL /article/.../load
        xhr.open('GET', request);
        //xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        //xhr.setRequestHeader("X-PINGOTHER", "pingpong");
        //xhr.setRequestHeader("Content-Type", "text/xml");

        //xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        //xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET');
        //xhr.setRequestHeader('Access-Control-Allow-Headers', '"Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR"');
        //xhr.setRequestHeader("Content-Type", "text/xml");

        // 3. Send the request over the network
        xhr.send();

        // 4. This will be called after the response is received
        xhr.onload = function() {
        if (xhr.status !== 200) { // analyze HTTP status of the response
            console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            //setData(xhr.response);
            //console.log('request', xhr.response)

            console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
        }
        };

        xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            console.log(`Received ${event.loaded} of ${event.total} bytes`);
        } else {
            console.log(`Received ${event.loaded} bytes`); // no Content-Length
        }

        };

        xhr.onerror = function() {
            console.log("Request failed");
        };

        xhr.onreadystatechange = function() {
            if (xhr.status !== 200) { // analyze HTTP status of the response
                console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
                // console.log('response', xhr.response)
                console.log('------------> begin')
                let xmlDoc  = xhr.responseXML;
                if (xmlDoc !== null){
                    console.log('xmlDoc', xmlDoc)
                    let x = xmlDoc.getElementsByTagName("Id");

                    // console.log('xmlDocx', x)

                    const xLen : number = x.length;
                    const data : [ApiObject] | any[] = [];

                    for (let i = 0; i < xLen; i++) {
                        const value = x[i].childNodes[0].nodeValue;
                        if (value !== null)
                        {
                            data.push({PubMedID: value});
                        }
                        
                    }
                    setAPI1List(data)
                    //let y = x.textContent;
                    // setData(tmp);
                } else {
                    setAPI1List([]);
                }
                // console.log('ready', xhr.response)
                // console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
                console.log('------------> end')
            }
            };

        //console.log('request2', xhr.onload)


        } else {
            setAPI1List([]);
        }

    }

      //useEffect( () => { getData() },[])     
      
    //   console.log("last data", data)

    /*
                <img
            src={"logo192.png"}
            alt="Info"
            style={{
                display:"flex",
                position:"relative",
              width: 20,
              backgroundColor: "white",
              verticalAlign: "center",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        */


    return (
        <>
         <MuscHeader/>
         <FloatingActionButtons/>
        <div>
           
            <div className='title'>
          
            <h1>Cited Reference Searching</h1>
            
            </div>
            
            <div>  

            <div className="box4">

            <h2> This website allows you to find the PubMed IDs (PMIDs) of </h2>
            <ul>
                <li><h3>Papers that cite a given paper</h3></li>
                <ul>
                    <li>Enter a PMID</li>
                    <li>Get a list of PMIDs that cite that paper</li>
                    <li>Download the list​</li>
                    <li>Install the PDF finder APP​</li>
                    <li>Import the PMID list and find all relevant PDFs that are freely available</li>
                </ul>
                <li><h3>Papers that a given paper cites​</h3></li>
                <ul>
                    <li>Enter a PMID</li>
                    <li>Then the process to get list and PDFs is the same as above​</li>
                </ul>
            </ul>
            </div>

            <div className="input__wrapper"> 

            <div className="box1">
                <h3>Search for the PubMedIDs of articles that cite this article</h3>

                <input id="api1" type="text" placeholder="Enter PubMedID" value={id1} onChange={e => setID1(e.target.value)}/>
                <button id="1" onClick={event => getData(id1, api1, `article_cited_by_PubMedID_${id1}`)}>Search</button>

                <h3>Search for the PubMedIDs of articles cited by this article</h3>

                <input id="api2" type="text" placeholder="Enter PubMedID" value={id2} onChange={e => setID2(e.target.value)}/>
                <button id="2" onClick={event2 => getData(id2, api2, `articles_that_cited_PubMedID_${id2}`)}>Search</button>
                <br />
                <br />
                </div>
                <div className="box2">
                <br />
                <ExportToExcel apiData={apiList} fileName={fileName}/>
                <br />
                </div>

                {apiList &&  id1 === "" && id2 === "" && apiList?.length === 0 && (
                    <div className="notFound">No Data Found</div>
                    )}

                    {apiList &&  id1 !== "" &&
                    apiList?.length > 0 &&
                    (
                        <div className="found"> <b>Articles that cited PubMedID: {id1}</b></div>
                    )}

                    {apiList &&  id2 !== "" &&
                    apiList?.length > 0 &&
                    (
                        <div className="found"> <b>Articles cited by PubMedID: {id2}</b></div>
                    )}

                    {apiList &&
                    apiList?.length > 0 &&
                    apiList?.map((data) => {
                        
                        return (
                        <div className="body__item" key={data?.PubMedID}>
                            <p>PubMedID: {data?.PubMedID}</p>
                        </div>
                        );
                    })}
            </div>

            </div>
        </div>
        </>
    );
}

export default ArticleFind;