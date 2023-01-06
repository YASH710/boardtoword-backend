const tableCellProperty = `
    <w:tcPr>
        <w:shd w:fill=\"auto\" w:val=\"clear\" />
        <w:tcMar>
            <w:top w:w=\"100.0\" w:type=\"dxa\" />
            <w:left w:w=\"100.0\" w:type=\"dxa\" />
            <w:bottom w:w=\"100.0\" w:type=\"dxa\" />
            <w:right w:w=\"100.0\" w:type=\"dxa\" />
        </w:tcMar>
        <w:vAlign w:val=\"top\" />
    </w:tcPr>
`;

const tableProperty = `
    <w:tblPr>
        <w:tblStyle w:val=\"Table1\" />
        <w:jc w:val=\"left\" />
        <w:tblW w:w=\"100%\" w:type=\"pct\" />
        <w:tblBorders>
            <w:top w:color=\"000000\" w:space=\"0\" w:sz=\"8\" w:val=\"single\" />
            <w:left w:color=\"000000\" w:space=\"0\" w:sz=\"8\" w:val=\"single\" />
            <w:bottom w:color=\"000000\" w:space=\"0\" w:sz=\"8\" w:val=\"single\" />
            <w:right w:color=\"000000\" w:space=\"0\" w:sz=\"8\" w:val=\"single\" />
            <w:insideH w:color=\"000000\" w:space=\"0\" w:sz=\"8\" w:val=\"single\" />
            <w:insideV w:color=\"000000\" w:space=\"0\" w:sz=\"8\" w:val=\"single\" />
        </w:tblBorders>
        <w:tblLayout w:type=\"fixed\" />
        <w:tblLook w:val=\"0600\" />
    </w:tblPr>
`;

const getCell = (data: string | null) => {
    if(data === null) data = '';
    return `
        <w:tc>
            ${tableCellProperty}
            <w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"00000002\">
                <w:pPr>
                    <w:keepNext w:val=\"0\"/>
                    <w:keepLines w:val=\"0\"/>
                    <w:pageBreakBefore w:val=\"0\"/>
                    <w:widowControl w:val=\"0\"/>
                    <w:pBdr>
                        <w:top w:space=\"0\" w:sz=\"0\" w:val=\"nil\"/>
                        <w:left w:space=\"0\" w:sz=\"0\" w:val=\"nil\"/>
                        <w:bottom w:space=\"0\" w:sz=\"0\" w:val=\"nil\"/>
                        <w:right w:space=\"0\" w:sz=\"0\" w:val=\"nil\"/>
                        <w:between w:space=\"0\" w:sz=\"0\" w:val=\"nil\"/>
                    </w:pBdr>
                    <w:shd w:fill=\"auto\" w:val=\"clear\"/>
                    <w:spacing w:after=\"0\" w:before=\"0\" w:line=\"240\" w:lineRule=\"auto\"/>
                    <w:ind w:left=\"0\" w:right=\"0\" w:firstLine=\"0\"/>
                    <w:jc w:val=\"left\"/>
                    <w:rPr/>
                </w:pPr>
                <w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\">
                    <w:rPr>
                        <w:rtl w:val=\"0\"/>
                    </w:rPr>
                    <w:t xml:space=\"preserve\">${data}</w:t>
                </w:r>
            </w:p>
        </w:tc>
    `;
}

export const createTable = (data : Record<string, any>[][]) => {
    if(data === undefined) throw new Error('Invalid data');
    let tableRows = '';

    tableRows += `
    <w:tr>
        <w:trPr>
            <w:cantSplit w:val=\"0\" />
            <w:tblHeader w:val=\"0\" />
        </w:trPr>
    `;

    // Create row for headers
    data[0].forEach((element) => {
        tableRows += getCell(element.title);
    })

    tableRows += "</w:tr>";

    data.forEach((rowData) => {
        tableRows += `
            <w:tr>
                <w:trPr>
                    <w:cantSplit w:val=\"0\" />
                    <w:tblHeader w:val=\"0\" />
                </w:trPr>
            `;
        
        rowData.forEach((element) =>{
            tableRows += getCell(element.text);
        });

        tableRows += "</w:tr>"
    })

    return `
        <w:tbl>
            ${tableProperty}
            ${tableRows}
        </w:tbl>
    `;
}
