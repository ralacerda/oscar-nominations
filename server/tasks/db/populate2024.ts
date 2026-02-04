import { z } from "zod";
import { awardsInfo } from "~~/shared/utils/awards";

const populatePayloadScheme = z.object({
  delay: z.coerce.number().optional(),
});

export default defineTask({
  meta: {
    name: "db:populate2024",
  },
  async run({ payload }) {
    const { delay } = populatePayloadScheme.parse(payload);

    const lines = data_2024.trim().split("\n\n");

    for (const line of lines) {
      const [id, values] = line.split("\n---\n");

      for (const x of values.split("\n")) {
        let movie;

        if (awardsInfo[id].requiresNominee) {
          const [movieId, personId, won] = x.split(",");
          movie = {
            id: parseInt(movieId, 10),
            nominee: parseInt(personId, 10),
            won: won === "true",
          };
        } else {
          const [movieId, won] = x.split(",");
          movie = {
            id: parseInt(movieId, 10),
            won: won === "true",
          };
        }

        await $fetch(`/api/nominations/2024/${id}`, {
          method: "POST",
          body: movie,
        });

        if (delay) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    return { result: "success" };
  },
});

const data_2024 = `
best-picture
---
840430
523607
466420
666277
346698
872585,true
1056360
792307
467244
915935

best-director
---
915935
466420
872585,true
792307
467244

best-actor
---
872585,2037,true
898713,91671
1056360,2954
523607,51329
840430,13242

best-actress
---
466420,1183917
895549,516
792307,54693,true
915935,7152
523607,36662

best-supporting-actor
---
872585,3223,true
346698,30614
1056360,1225953
792307,103
466420,380

best-supporting-actress
---
872585,5081
558915,1075037
346698,59174
840430,1180099,true
895549,1038

best-original-screenplay
---
839369
915935,true
666277
523607
840430

best-adapted-screenplay
---
872585
346698
1056360,true
792307
467244

best-animated-feature
---
569094
838240
976573
508883,true
961323

best-international-feature
---
906126
998022
937746
467244,true
976893

best-documentary-feature-film
---
1032760
1058616,true
1004683
1015356
1069193

best-documentary-short-film
---
1186247
1203439
1171861,true
1085779
1186227

best-live-action-short-film
---
1084765
1169455
923939,true
971468
1194636

best-original-score
---
1056360
466420
335977
872585,true
792307

best-original-song
---
346698,true
466420
626332
1171816
346698

best-sound
---
467244,true
872585
523607
575264
670292

best-production-design
---
792307,true
872585
753342
466420
346698

best-cinematography
---
991708
792307
466420
523607
872585,true

best-makeup-and-hairstyling
---
899524
792307,true
906126
872585
523607

best-film-editing
---
840430
792307
915935
872585,true
466420

best-visual-effects
---
670292
940721,true
447365
575264
753342

best-costume-design
---
346698
466420
753342
872585
792307,true
`;
