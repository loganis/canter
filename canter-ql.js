// - [Prepocess](#preprocess)
// - [Gooh](#gooh)
// - [Goog](#goog)
// - [CQL](#cql)



// ### Tabular format ###
// In postprocess operations we refer to values using the following conventions.
// <table>
// <tr><td>&nbsp;</td><td>**col1**</td><td>**col2**</td><td>**col3**</td></tr>
// <tr><td>*row1*</td><td>v11</td><td>v12</td><td>v13</td></tr>
// <tr><td>*row2*</td><td>v21</td><td>v22</td><td>v23</td></tr>
// </table>
//
// > in *row1*
// >> `row['col1']` is `'v11'`
// >> `col['col1']` is `['v11','v21']`
//
// > in *row2*
// >> `row['col1']` is `'v21'`
// >> `col['col1']` is `['v11','v21']`


// `funs`<br />Temporal demo data
var funs = { "Page": function(row) { return row['kpia'] * 2 + row["kpib"] + sum(col['kpia']) },
	      "Bounce": function(row) { return row['Page'] * 2 }}



// ### Preprocess ###
// Helper functions for preprocessing CQL queries

// `getFnDef(f)`<br />Returns a function definition string
var getFnDef = function(f)
{ if (f != undefined)
  { return f.toString()}
  else 
  { return ""}}

// `reRowCol`<br />Regex for matching a row['Value'] or col["Value"]
//var reRowCol = /(row|col)\[(\'|\")(\w+|\w+:\w+)(\'|\")\]/g;
var reRowCol = /(row|col|def)\[(\'|\")([^\[\]]+)(\'|\")\]/g;

// `reObjVoK`<br />Regex for matching a Value of a Keyword: ['Value']
//var reObjVoK = /.*?\[.(\w+|\w+:\w+).\]/;
var reObjVoK = /.*?\[.([^\[\]]+).\]/;

// `reGetKey(s)`<br />Returns the Value of a Keyword string: ['Value']
var reGetKey = function(s)
{ return s.replace(reObjVoK,"$1")}

// `reHasCol(s)`<br />Returns the input string if it contains 'col'
var reHasCol = function(s)
{ if (s.match(/col/))
  { return s}}

// `reHasDef(s)`<br />Returns the input string if it contains 'def'
var reHasDef = function(s)
{ if (s.match(/def/))
  { return s}}

// `reHasRow(s)`<br />Returns the input string if it contains 'row'
var reHasRow = function(s)
{ if (s.match(/row/))
  { return s}}

// `getFnCols(f)`<br />Returns `col` matches from a function definition
var getFnCols = function(f)
{ return uniq(map(reGetKey,getFnDef(f).match(reRowCol).filter(reHasCol)))}

// `getFnDefs(f)`<br />Returns `def` matches from a function definition
var getFnDefs = function(f)
{ return uniq(map(reGetKey,getFnDef(f).match(reRowCol).filter(reHasDef)))}

// `getFnRows(f)`<br />Returns `row` matches from a function definition
var getFnRows = function(f)
{ return uniq(map(reGetKey,getFnDef(f).match(reRowCol).filter(reHasRow)))}

// `getFnRowsCols(f)`<br />Returns `row` and `col` matches from a function definition
var getFnRowsCols = function(f)
{ return uniq(map(reGetKey,getFnDef(f).match(reRowCol)))}


// `dependentCols(obj)`<br />Returns object dependencies for object `fun:`
// Each `key` depends on its `values`
var dependentCols = function(obj)
{ var res = {};
  map(function(k)
      { res[k] = getFnRowsCols(obj[k])},
     keys(obj))
  return res}


// `columnDependecies(obj)`<br />Returns an array of dependency key pairs form dependentCols object
var columnDependecies = function(obj)
{ var res = [];
  map(function(k)
      { obj[k].map(function(v)
		   { res.push([k,v])})},
     keys(obj));
  return res}


// `columnProcessingOrder(obj)`<br />Returns the column processing order for object `fun:`
var columnProcessingOrder = comp(
    "->",
    dependentCols,
    columnDependecies,
    tsort);




// ## Gooh ##
// Basic helper functions for Google Apps Script

var gooh = {

    // ### Analytics ###
    
    // `gooh.getGaColNames(obj)`<br /> Returns an array of the column names of a GA result object `obj`
    getGaColNames: function(obj)
    { return map(comp("->", [getv, "name"]),
		 obj['columnHeaders'])},
    
    // `gooh.getGaColType(obj)`<br /> Returns an array of the column types of a GA result object `obj` 
    getGaColTypes: function(obj)
    { return map(comp("->", [getv, "columnType"]),
		 obj['columnHeaders'])},
    
    // `gooh.getGaColDataTypes(obj)`<br /> Returns an array of the column data types of a GA result object `obj` 
    getGaColDataTypes: function(obj)
    { return map(comp("->", [getv, "dataType"]),
		 obj['columnHeaders'])},

    // `gooh.getGaRows(obj)`<br /> Returns the rows matrix of a GA result object `obj` 
    getGaRows: function(obj)
    { return obj['rows']},

    // `gooh.getGaTotals(obj)`<br /> Returns the totals object of a GA result object `obj` 
    getGaTotals: function(obj)
    { return obj['totalsForAllResults']},

    // `gooh.gaTemplate(cq)`<br />Returns a Google Analytics query object from a `cq` definition that can be applied to a get function
    // Reference: [gas](https://developers.google.com/apps-script/advanced/analytics)
    // [gav3](https://developers.google.com/analytics/devguides/reporting/core/v3/reference)
    // > &gt; var cq = {pid: "12345678", met: "ga:visits", beg: "2013-03-21", end: "2013-04-17", dim: "date"};
    // > &gt; gaTemplate(cq)
    // > {"pid":"ga:12345678","beg":"2013-03-21","end":"2013-04-17","met":"ga:visits","rest":{"dimensions":"date"}}
    gaTemplate: function(cq) 
    { var obj = 
      { "dimensions": cq.dim,
	'filters': cq.fil,
	'max-result': cq.max,
	'samplingLevel': cq.smp, // DEFAULT, FASTER, HIGHER_PRECISION
	'segment': cq.seg,
      	'sort': cq.ord,
	'start-index': cq.sti,
	'output': cq.out 	// json, dataTable
      };
      return {pid: 'ga:'+cq.pid,
	      beg: cq.beg,
	      end: cq.end,
	      met: cq.met,
	      rest: filterObject(obj,is.notUndefined)}},

    // `gooh.gaGet(q)`<br />Returns the result of GA query `q`
    gaGet: function(q)
    { return Analytics.Data.Ga.get(q.pid,
				   q.beg,
				   q.end,
				   q.met,
				   q.rest)},

    // `gooh.mcfGet(q)`<br />Returns the result of Mcf GA query `q`
    mcfGet: function(q) 
    { return Analytics.Data.Mcf.get(q.pid,
				    q.beg,
				    q.end,
				    q.met,
				    q.rest)},

    // `gooh.rtGet(q)`<br />Returns the result of Realtime GA query `q`
    rtGet: function(q)
    { return Analytics.Data.Realtime.get(q.pid,
					 q.beg,
					 q.end,
					 q.met,
					 q.rest)},

    // `gooh.accountsGet(q)`<br />Returns the GA account list
    accountsGet: function()
    { return Analytics.Management.Accounts.list()},

    // `gooh.webPropertyGet(accountId, webPropertyID`<br />Returns a property
    webPropertyGet: function(accountId, webPropertyID)
    { return Analytics.Management.Webproperties.get(accountId,
						    webPropertyID)},

    // ### Spreadsheet ###

    // `gooh.reateSheet(s)`<br />Returns a new sheet object
    createSheet: function(s) 
    { return SpreadsheetApp.create(s)},

    // `gooh.moveSheetToFolder(sheet, fid)`<br />Moves a file to a Drive folder
    moveSheetToFolder: function(sheet, fid)
    { var oldfile = DriveApp.getFileById(sheet.getId());
      DriveApp.getFolderById(fid).addFile(oldfile);
      DriveApp.getRootFolder().removeFile(oldfile)}
    
};

// ## Goog ##
// Composed high level functions for Google Apps Script
var goog = {
    // ### Analytics ###

    // `goog.runGaGet(cq)`<br />Runs a GA query and returns results in an object. 
    // > &gt; var cq = {pid: '12345678', beg: '2015-10-22', end: '2015-10-29', met: 'ga:sessions,ga:users', dim: 'ga:date'};
    // > &gt; var res = goog.runGaGet(cq);
    // > &gt; var sheet = gooh.createSheet("GA query 1");
    // > &gt; gaExportToSheet(sheet.getActiveSheet(),res);
    // > &gt; Logger.log("Report is available at " + sheet.getUrl());
    // > Report is available at ~a link~
    runGaGet: comp(
	"->", 
	gooh.gaTemplate,
	gooh.gaGet),
    
    // `goog.runMcfGet(cq)`<br />Runs an Mcf GA query and returns results in an object. 
    runMcfGet: comp(
	"->",
	gooh.gaTemplate,
	gooh.mcfGet),

    // `goog.runRtGet(cq)`<br />Runs a Real-Time GA query and returns results in an object. 
    runRtGet: comp(
	"->",
	gooh.gaTemplate,
	gooh.mcfGet),

    // ### Spreadsheet ###

    // `goog.gaExportToSheet(sheet,obj)`<br />Exports a GA query results `obj` to a `sheet` object.
    gaExportToSheet: function(sheet,obj)
    { sheet.appendRow(gooh.getGaColNames(obj));
      map(sheet.appendRow,
	  gooh.getGaRows(obj))},

    // `goog.exportToSheet(sheet,oar)`<br />Exports dataset `oar` to a `sheet` object.
    objectToSheet: function(sheet,oar)
    { var colnames = colNames(oar);
      sheet.appendRow(colnames);
      map(sheet.appendRow,
	  oar2mtx(selectColumn(colnames, oar)))},

    // `goog.gaToObject(obj)``<br />Returns a dataset object from GA query result object `obj`
    gaToObject: function(obj)
    { return mtx2oar(cons(gooh.getGaColNames(obj),
				 gooh.getGaRows(obj)))}

}

// ## CQL ##
// Declarative style query and postprocess functions
var cqlTypes = 
    {"ga": goog.runGaGet,
     "mcf": goog.runMcfGet,
     "rt": goog.runRtGet};

// `funs`<br />Temporal demo data
var cql = {typ: "ga",
	   pid: '12345678',
	   beg: '2015-10-22',
	   end: '2015-10-29',
	   met: ' ga:sessions , ga:users ',
	   dim: ' ga:date ',
	   def: { "sumcol": function(col) { return sum(col["ga:sessions"]) + sum(col['ga:users'])},
		  "sumco2": function(col) { return sum(col["ga:users"])}
		},
	   fun: { "3rd": function(row) {return row["Bounce"] * 3 + 1},     
		  "Page": function(def, row){ return row["ga:sessions"] * 2 + row["ga:users"] + def['sumcol'] },
		  "Bounce": function(row) { return row['Page'] * 2 + row["ga:sessions"]}
		}
	  };

var gaResp = csv2oar(",","ga:date,ga:sessions,ga:users\n20151022,24102,21212\n20151023,29564,25656\n20151024,14238,12859\n20151025,17557,15875\n20151026,24728,21523\n20151027,28305,24619\n20151028,24867,21555\n20151029,13621,12290");
var processCql = function(cq)
{ // per: , fun: , col:
    var basecols = merge(cq.met.split(","), cq.dim.split(","));
    basecols = map(strim, basecols);
    var fundef = mergeObjects(cql.def, cql.fun);
    var funcols = difference(columnProcessingOrder(fundef), basecols);
    // console.log("basecols "+ JSON.stringify(basecols));
    //console.log("fundef "+ JSON.stringify(fundef));
    //console.log("funcols "+ JSON.stringify(funcols));
    // run base query based on typ:
    var gaResp1 = 1;
    // init temp calc storage
    var col = {}; 
    var def = {};
    var funli = funcols.length;
    // for each fun: definition
    // def: caches col[] and def[] based values
    // fun: contains only row[] or def[], no cols
    for (var i=0; i<funli; i++)
    { // next column function and type: fun: or def:
      var nextColFn, nt;
      if (is.notUndefined(cq.fun[funcols[i]]))
      { nextColFn = cq.fun[funcols[i]]; nt = 'fun'}
      else
      { nextColFn = cq.def[funcols[i]]; nt = 'def'}

      var fnCols; 
      if (nt == 'fun')
      { fnCols = getFnDefs(nextColFn)}
      else if (nt == 'def')
      { fnCols = getFnCols(nextColFn)}
      console.log("fnCols nt " + nt + " | " + funcols[i] + " | " + nextColFn + " /// " + JSON.stringify(fnCols));
      
	var fnColsli = fnCols.length;
      
      // calc cols in def:
      if (fnColsli > 0 && nt == 'def') // if there is col in fun def
      { for (var j=0; j<fnColsli; j++)
	{ if (col[fnCols[j]] == undefined) // if this col is not yet cached
	  { col[fnCols[j]] = pluck(fnCols[j],gaResp)}}}

      // store def function result
      if (nt == 'def')
      { def[funcols[i]] = nextColFn(col) }
      //console.log("itt def " + JSON.stringify(def));

      // fun process
      if (nt == 'fun')
      { var resli = gaResp.length;
	var res = [];
	var needDef = true;
	if (fnCols.length == 0)
	{ needDef = false}
	// proces fun on rows
	for (var j=0; j<resli; j++)
	{ var nv;
	  if (needDef) { nv = nextColFn(def, gaResp[j])}
	  else { nv = nextColFn(gaResp[j])}
	  res.push(nv)}
	// merge res to gaResp
	gaResp = addColumn(funcols[i],res, gaResp);
	//console.log("fun res " + JSON.stringify(res));
      }
      

//      console.log(JSON.stringify(db));
    }
    return funcols}


/////////
var timer = function(name) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            console.log('Timer:', name, 'finished in', time, 'ms');
        }
    }
};

/*

Mult * generalise

oar2csv, comp as local fn symbol
*/

