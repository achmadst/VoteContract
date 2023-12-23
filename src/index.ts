import { Canister, bool, query, AzleText, update, AzleVoid } from 'azle';

var votesReceived: { [key: string]: number } = {"Achmad": 0, 
"Icho": 0, 
};
var candidateList: string[] = ["Achmad", "Icho"];


export default Canister({
 
    voteForCandidate: update([AzleText], AzleVoid, (candidate) => {
        if (!candidateList.includes(candidate)) {
            throw new Error('Invalid candidate');
        }
        if (!votesReceived[candidate]) {
            votesReceived[candidate] = 0;
        }
        votesReceived[candidate]++;
    }),

    getVotes: query([AzleText], AzleText, (candidate) => {
        if (!candidateList.includes(candidate)) {
            throw new Error('Invalid candidate');
        }
        return (votesReceived[candidate].toString());
    }),
});
