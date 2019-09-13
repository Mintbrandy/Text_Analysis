from rest_framework.views import APIView
from .model.analyze import *
from .constant import emoji_table, emotion_table
from rest_framework.response import Response


class TextAnalysisView(APIView):
    def post(self, request, pattern, format=None):
        text = request.data['input_text']
        p_label_idx, words_coef, class_prob = analyze(text, pattern)
        top_words, bot_k_words = top_coefs(10, target_type='emoji', p_label_idx=p_label_idx)

        pred_label = emoji_table[p_label_idx] if pattern == 'emoji' else emotion_table[p_label_idx]

        data_dict = {'p_label': pred_label,
                     "class_prob": sorted(class_prob, key=lambda x: x["value"], reverse=True),
                     'text_word_coef': words_coef,
                     "most_related_words_in_dict": top_words,
                     "least_related_words_in_dict": bot_k_words}
        return Response(data_dict)
