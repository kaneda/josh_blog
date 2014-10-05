from django.views.generic.base import TemplateView
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.template import RequestContext
from django.conf import settings
import os
import Image

class GalleryView(TemplateView):
    def get(self,request,gallery_name):
        response_dict = {"img_map":{},"error":"","gallery_name":gallery_name}
        base_gal = "{0}/images/galleries".format(settings.STATIC_ROOT)
        MAX_DIM = 400.0 # px
        try:
            gallery_name = re.sub(r'(-|\s)', '_', gallery_name.split('/')[-1].lower()).replace('.','')
            response_dict["original_name"] = gallery_name.replace('_',' ').title()
            response_dict["gallery_name"] = gallery_name
            img_list = os.listdir("{0}/{1}".format(base_gal, gallery_name))
            full_imgs = filter(lambda x: '_thumb' not in x, img_list)
            for img in full_imgs:
                # Use a naming convention to find the thumb
                # Don't allow periods ('.') in names
                # Only supports JPEGs
                base_name = img.split('.')[0]
                thumb_nail = "{0}_thumb.jpg".format(base_name)
                thumb_path = "{0}/{1}/{2}".format(base_gal, gallery_name, thumb_nail)
                if not os.path.isfile(thumb_path):
                    try:
                        c_img = Image.open("{0}/{1}/{2}".format(base_gal, gallery_name, img))
                        s = c_img.size
                        ratio = 1.0
                        if(s[0] > s[1]):
                            ratio = MAX_DIM / s[0]
                        else:
                            ratio = MAX_DIM / s[1]
                        c_img.resize((int(s[0]*ratio), int(s[1]*ratio)), Image.ANTIALIAS)
                        c_img.save(thumb_path, "JPEG")
                    except:
                        continue
                response_dict["img_map"][img] = thumb_nail
        except:
            base = '404.html'
            response_dict['error'] = "Gallery does not exist"
            context = RequestContext(request, response_dict)
            return render_to_response(base, context_instance=context)

        base = 'gallery.html'
        context = RequestContext(request, response_dict)
        return render_to_response(base, context_instance=context)

