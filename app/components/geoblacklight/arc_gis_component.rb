# frozen_string_literal: true

module Geoblacklight
  class ArcGisComponent < ViewComponent::Base
    attr_reader :document

    def initialize(document:, action:, **)
      @document = document
      super
    end

    # Generates an ArcGIS.com viewer url with params that can open content directly
    # See: https://doc.arcgis.com/en/arcgis-online/reference/use-url-parameters.htm
    def arcgis_link(arcgis_urls)
      params = URI.encode_www_form(
        urls: arcgis_urls
      )
      Settings.ARCGIS_BASE_URL + "?" + params
    end

    def key
      "arcgis"
    end
  end
end
