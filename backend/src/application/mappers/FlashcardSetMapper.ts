import { Types } from "mongoose";

import {Flashcard } from "../../domain/entities/Flashcard.entity";

import { FlashcardSet } from "../../domain/entities/FlashcardSet.entity";

import { FlashcardSetLean } from "../../infrastructure/database/models/FlashcardSet";

export const toDomainFlashcardSet = (
    db: FlashcardSetLean
): FlashcardSet => {

    return new FlashcardSet({

        id: db._id.toString(),

        userId: db.userId.toString(),

        documentId: db.documentId.toString(),

        topic: db.topic,

        cardCount: db.cardCount,

        creditsUsed: db.creditsUsed,

        cards: db.cards.map(
            (card) =>
                new Flashcard({
                    question: card.question,
                    answer: card.answer,
                    difficulty: card.difficulty,
                })
        ),

        createdAt: db.createdAt,

        updatedAt: db.updatedAt,
    });
};

export const toPersistenceFlashcardSet = (
    entity: FlashcardSet
) => {

    return {

        userId: new Types.ObjectId(
            entity.userId
        ),

        documentId: new Types.ObjectId(
            entity.documentId
        ),

        topic: entity.topic,

        cardCount: entity.cardCount,

        creditsUsed: entity.creditsUsed,

        cards: entity.cards.map(
            (card) => ({
                question: card.question,
                answer: card.answer,
                difficulty: card.difficulty,
            })
        ),
    };
};