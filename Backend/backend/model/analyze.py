from joblib import dump, load
import pickle
import numpy as np
from ..constant import emoji_table, emotion_table

EMOJI_MODEL_PATH = './backend/model/emoji_cls.joblib'
EMOJI_VECTOR_PATH = './backend/model/emoji_tfidf_vect.tmp'

EMOTION_MODEL_PATH = './backend/model/emotion_cls.joblib'
EMOTION_VECOT_PATH = './backend/model/emotion_tfidf_vect.tmp'


def analyze(text, target_type='emoji'):
    model_path = EMOJI_MODEL_PATH if target_type == 'emoji' else EMOTION_MODEL_PATH
    vector_path = EMOJI_VECTOR_PATH if target_type == 'emoji' else EMOTION_VECOT_PATH
    class_table = emoji_table if target_type == 'emoji' else emotion_table

    cls = load(model_path)
    classes = cls.classes_
    class_index_dict = dict((int(className), index) for index, className in enumerate(classes))
    with open(vector_path, 'rb') as pickle_file:
        tfidf_vect = pickle.load(pickle_file)

    p_label_idx, words_coef, class_prob = predict_input(text, cls, tfidf_vect, class_index_dict, class_table)
    return int(p_label_idx), words_coef, class_prob


def predict_input(text, cls, tfidf_vect, class_index_dict, class_table):
    tfidf_X = tfidf_vect.transform([text])
    y = cls.predict(tfidf_X)
    y_prob = cls.predict_proba(tfidf_X)

    feature_names = tfidf_vect.get_feature_names()
    class_prob = [{'name': class_table[i], 'value': y_prob[0][class_index_dict[i]]} for i in range(len(class_table))]
    print(tfidf_X.indices)
    word_coef = [{'name': feature_names[i], 'value': cls.coef_[0][i]} for i in tfidf_X.indices]
    return y[0], word_coef, class_prob


def top_coefs(k, target_type='emoji', p_label_idx=0):
    model_path = EMOJI_MODEL_PATH if target_type == 'emoji' else EMOTION_MODEL_PATH
    vector_path = EMOJI_VECTOR_PATH if target_type == 'emoji' else EMOTION_VECOT_PATH

    cls = load(model_path)
    class_idx = list(cls.classes_).index(str(p_label_idx)) if target_type == 'emoji' else 0
    class_info = cls.coef_[class_idx]

    with open(vector_path, 'rb') as pickle_file:
        tfidf_vect = pickle.load(pickle_file)
        feature_names = tfidf_vect.get_feature_names()
    top_k = np.argsort(class_info)[-k:]
    bot_k = np.argsort(class_info)[:k]
    top_k_words = [{'name': feature_names[i], 'value': class_info[i]} for i in reversed(top_k)]
    bot_k_words = [{'name': feature_names[i], 'value': -class_info[i]} for i in bot_k]
    return top_k_words, bot_k_words
