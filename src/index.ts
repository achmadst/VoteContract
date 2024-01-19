import { Canister, bool, query, AzleText, update, AzleVoid } from 'azle';

var votesReceived: { [key: string]: number } = {};
var candidateList: string[] = ["Achmad", "Icho"];

candidateList.forEach(candidate => {
    votesReceived[candidate] = 0;
});

export default Canister({
 
    voteForCandidate: update([AzleText], AzleVoid, (candidate) => {
        if (!candidateList.includes(candidate)) {
            throw new Error('Invalid candidate');
        }
        votesReceived[candidate]++;
    }),

    getVotes: query([AzleText], AzleText, (candidate) => {
        if (!candidateList.includes(candidate)) {
            throw new Error('Invalid candidate');
        }
        return (votesReceived[candidate].toString());
    }),

    addCandidate: update([AzleText], AzleVoid, (candidate) => {
        if (candidateList.includes(candidate)) {
            throw new Error('Candidate already exists');
        }
        candidateList.push(candidate);
        votesReceived[candidate] = 0;
    }),

    getTotalVotes: query([], AzleText, () => {
        let totalVotes = 0;
        for (let candidate in votesReceived) {
            totalVotes += votesReceived[candidate];
        }
        return totalVotes.toString();
    }),
});
