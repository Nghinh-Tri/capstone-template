const initState = [
    {
        position: 'Business Analysis',
        candidateList: [
            { empID: '1', name: 'A', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
            { empID: '2', name: 'B', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
            { empID: '3', name: 'C', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
            { empID: '4', name: 'D', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
        ]
    },
    {
        position: 'Back-end Developer',
        candidateList: [
            { empID: '5', name: 'Dasd', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
            { empID: '6', name: 'Dasdasd', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
            { empID: '7', name: 'Dasdasdsadasd', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
        ]
    },
    {
        position: 'Front-end Developer',
        candidateList: [
            { empID: '8', name: 'Daaaa', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
            { empID: '9', name: 'Ddddd', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
            { empID: '10', name: 'Dqqq', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
            { empID: '11', name: 'Ddffgg', matchLang: 3, matchSoftSkill: 4, matchHardSkill: 5, match: 95.95 },
        ]
    }
]

const SuggestCandidateList = (state = initState, action) => {
    switch (action) {
        default:
            return [...state];
    }
}

export default SuggestCandidateList