# frozen_string_literal: true

module Geoblacklight
  class HeaderIconsComponent < ViewComponent::Base
    attr_reader :document, :fields

    def initialize(document:, fields: [Settings.FIELDS.RESOURCE_CLASS, Settings.FIELDS.PROVIDER, Settings.FIELDS.ACCESS_RIGHTS])
      @document = document
      @fields = fields
      super
    end

    def get_icon(field)
      icon_name = @document[field]
      if icon_name&.include?("Datasets")
        field = Settings.FIELDS.RESOURCE_TYPE
        icon_name = @document[field]
      end
      icon_name = icon_name.is_a?(Array) ? icon_name.first : icon_name
      icon_name = icon_name.gsub(" data", "") if field == Settings.FIELDS.RESOURCE_TYPE
      geoblacklight_icon(icon_name, classes: "svg_tooltip")
    end
  end
end
