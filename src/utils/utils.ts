import * as convert from "xml-js";

export function convertToJSON (xml: string) {
    const replaced = xml.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
    const parsedJSONStr = convert.xml2json(replaced, { compact: true, spaces: 4 });
    return JSON.parse(parsedJSONStr);
}

export function getTotalPage (resultObject: any) {
    const listTotalCount = Number.parseInt(resultObject.lists.list_total_count._text);
    return listTotalCount % 10 === 0 ? listTotalCount / 10 : Math.floor(listTotalCount / 10) + 1;
}

export function substringBefore(str: string, delimiter: string) {
    const index = str.indexOf(delimiter);
    return index >= 0 ? str.substring(0, index) : str;
}

export function substringAfter(str: string, delimiter: string) {
    const index = str.indexOf(delimiter);
    return index >= 0 ? str.substring(index, str.length) : str;
}