import axios from 'axios';

export const fetchCitationsForArXivId = async (id) => {
    if(!id || id.length == 0) {
        return [];
    }
    let response = await axios.get('https://api.semanticscholar.org/graph/v1/paper/arXiv:' + id + '?fields=title,citations,citations.title,citations.authors,citations.year,citations.url')
    if(response.data.citations) {
        return (response.data.citations);
    } else {
        return []
    }
}

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

export const generateCiteTableDataFromListOfCitations = async (list_of_citations) => {
    // set of all ids
    var id_set = new Set([]);
    var citation_dict = {};
    var list_of_id_sets = [];
    list_of_citations.forEach(loc => {
        console.log("loc", loc);
        var id_list = [];
        loc.forEach(l => {
            id_list.push(l.paperId);
            var author_text = "";
            l.authors.forEach(a => {
                author_text += a.name + ", ";
            });
            l.author_text = author_text.substring(0, author_text.length - 2);
            citation_dict[l.paperId] = l;
        })
        let set = new Set(id_list);
        id_set = union(id_set, set);
        list_of_id_sets.push(set);
    });

    var cite_table_data = [];

    console.log("id_set", id_set.size)

    id_set.forEach(id => {
        var cites_count = 0;
        var obj = {...citation_dict[id], cites_paper_1: 0, cites_paper_2: 0, cites_paper_3: 0, cites_paper_4: 0};

        if(list_of_id_sets[0].has(id)) {cites_count += 1; obj.cites_paper_1 = 1;}
        if(list_of_id_sets[1].has(id)) {cites_count += 1; obj.cites_paper_2 = 1;}
        if(list_of_id_sets[2].has(id)) {cites_count += 1; obj.cites_paper_3 = 1;}
        if(list_of_id_sets[3].has(id)) {cites_count += 1; obj.cites_paper_4 = 1;}

        obj.cites_count = cites_count;

        cite_table_data.push(obj);
    })

    return [id_set.size, cite_table_data];
}