function mergeContiguousSimilarEmotions(fakeInform) {
    const mergedSegments= [];
    fakeInform.segments.forEach((segment, index) => {
        if (index === 0) {
            // Primer segment, s'afegeix directament
            mergedSegments.push(segment);
        } else {
            const lastSegment = mergedSegments[mergedSegments.length - 1];

            if (lastSegment.emotion.title === segment.emotion.title && 
                lastSegment.emotion.description === segment.emotion.description) {
                // Els segments són contigus i tenen la mateixa emoció
                lastSegment.segment += " " + segment.segment;

                // Calcula la mitjana del score
                const totalScore = lastSegment.emotion.score * lastSegment.count + segment.emotion.score;
                lastSegment.count += 1;
                lastSegment.emotion.score = totalScore / lastSegment.count;
            } else {
                // Diferent emoció o no contiguïtat
                segment.count = 1; // Inicialitza el comptador de segments per a aquest nou segment
                mergedSegments.push(segment);
            }
        }
    });

    return {
        ...fakeInform,
        segments: mergedSegments
    };
}
export default mergeContiguousSimilarEmotions;