<template>
    <BlogEntry
        :date="date"
        description="Ice breaking exercise for groups of people applied in the context of an Agility training"
        duration="5"
        :entry="entry"
        :isRenderedFromList="isRenderedFromList"
        :languages="entry.languages"
        :allTags="allTags"
        :tags="[tags.Dissemination]"
        :title="title"
    >
        <p>
            Last week we had an Agile Training in my company (Sage, in the Barcelona office).
            Usually I feel lazy about this kind of trainings because they focus on very abstract
            topics and also because the theory and practice of project management are as different
            as chalk and cheese, so I was expecting a boring couple of days sitting all together in
            a room stating the obvious and agreeing on how useful those methodologies are.
        </p>
        <div v-if="!isRenderedFromList">
            <p>
                Aware of the scepticism he would find between the training audience, the trainer was
                wise enough to show up with an ice-breaker exercise to catch our very transient
                attention and make room for the highly necessary open mindset to face the topics we
                were about to discuss. In an attempt to make the training as quick as possible and
                not without a certain feeling of being about to waste our time, I volunteered when
                he asked for 8 people to complete the ice-breaker.
            </p>
            <p>
                In the end the exercise was fun and I felt it was a good excuse to start writing the
                blog I have been think of lately and that was worth sharing it with any eventual
                reader I might have. So, without further ado, here is a graphical representation of
                the exercise (a picture is worth a thousand words) drastically limited by my drawing
                skills on GIMP (so I should be happy if its worth anything more than two hundred):
            </p>
            <p class="text-center">
                <img
                    :src="`/vue-personal-page/${images.agileExercise}`"
                    alt="Agility exercise representation"
                />
            </p>
            <p>
                In short, the exercise consist of any even number of people (4 at least) standing in
                a circle facing inward. All the participants will first hold the left hand of the
                participant in front of them with their left hand and hold any other participant's
                right hand with their right hand, thus forming an interlaced closed circle. The goal
                of the team is to undo the interlaces without letting go of anyone's hands.
            </p>
            <p>
                We took 15 minutes to get to a "better situation" but in fact we never managed to
                solve the problem. The trainer insisted that it is possible and that probably we
                have someone in the group who isn't very familiar with the right and left concepts.
                In my opinion, if it hadn't have been for the duty calls of the training, we would
                still be stuck in that room trying to figure it out. On a final note, the exercise
                is worth giving it a shot and is totally fit for drinking game purposes.
            </p>
        </div>
    </BlogEntry>
</template>

<script>
import BlogEntry from '../../blog-entry';
import { tags } from '../../tags';
import entriesRegistry from '../registry';
import agileExercise from './agile-exercise.png';

const date = '2019-06-17';
const entry = entriesRegistry['agility-rocks'];
const title = 'Agility... rocks?';

export default {
    name: entry.id,
    components: {
        BlogEntry
    },
    props: ['isRenderedFromList', 'allTags'],
    data() {
        return {
            date,
            entry,
            images: {
                agileExercise
            },
            tags,
            title
        };
    }
};
</script>
